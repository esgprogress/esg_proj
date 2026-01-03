import logging
import shutil
import os
from pathlib import Path
from fastapi import FastAPI, UploadFile, File
from fastapi.params import Depends
from starlette.middleware.cors import CORSMiddleware

from backends.auth.auth0_auth import auth0
from backends.constants.mongo_client import data_collection, industries_collection, questions_collection
import json
from backends.data_handling.insert_schema_into_mongo import insert_json_into_mongo
from backends.data_handling.json_schema_gpt import extract_data
from backends.data_handling.pdf_to_llm_context import pdf_to_context
from backends.log.logging_config import logging_configuration
from backends.log.logging_middleware import RouterLoggingMiddleware

# Manage logging dir
os.makedirs("logs", exist_ok=True)

# Set logging
logging.config.dictConfig(logging_configuration)

# Instantiate an instance of the FastAPI client
web_server = FastAPI(title="ESGProject")
UPLOAD_DIR = Path("uploads")
UPLOAD_DIR.mkdir(exist_ok=True)
import sys, os
print("CWD:", os.getcwd())
print("sys.path:", sys.path)

web_server.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

web_server.add_middleware(
    RouterLoggingMiddleware,
    logger=logging.getLogger(__name__),
)

@web_server.get("/api/fetchIndustries", summary="Retrieve industries", description="Retrieve all currently-supported industries")
async def fetchIndustries():
    # Fetch the industries and slugs and send them over
    result = industries_collection.find({}, {"_id": 0})
    json_dump = list(result)
    return json_dump

@web_server.get("/api/fetchCompaniesByIndustry", summary="Retrieve companies in industry", description="Retrieve all companies operating in a given industry")
async def fetchCompaniesByIndustry(industry: str):
    result = data_collection.find({"industry": industry}, {"_id": 0, "industry": 1})
    json_dump = list(result)
    return json_dump

@web_server.get("/api/fetchQuestions", summary="Fetch questions", description="Fetch all questions for companies operating in a given industry")
async def fetchQuestions(industry: str):
    result_all = questions_collection.find({"industry": "main"}, {"_id": 0})
    result_industry_specific = questions_collection.find({"industry": industry}, {"_id": 0})
    json_dump_main = list(result_all)
    json_dump_industry_specific = list(result_industry_specific)
    return json_dump_main + json_dump_industry_specific


@web_server.put("/api/addQuestionSpecific", summary="Add new question to env list of industry", description="Given a particular industry, add a new question to the list of industry-specific questions that will be asked")
async def addQuestionSpecific(industry: str, question: str, qualitative: bool, claims: dict = Depends(auth0.require_auth)):
    if (qualitative):
        questions_collection.update_one({"industry": industry}, {"$push": {"qualitative": question}}, upsert=True)
    else:
        questions_collection.update_one({"industry": industry}, {"$push": {"quantitative": question}}, upsert=True)


@web_server.put("/api/addCategory", summary="Add new industry category", description="Add a new industry category to the list of industries")
async def addCategory(industry: str, claims: dict = Depends(auth0.require_auth)):
    industries_collection.update_one({}, {"$push": {"industries": industry}}, upsert=True)

@web_server.put("/api/addQuestionGeneral", summary="Add new generic question", description="Add a new generic question to the list of questions that every company is subjected to")
async def addQuestionGeneral(type: str, question: str, qualitative: bool = False, claims: dict = Depends(auth0.require_auth)):
    if (type == "social" or type == "governance"):
        questions_collection.update_one({"industry": "general"}, {"$push": {type: question}}, upsert=True)
    else:
        if (qualitative):
            questions_collection.update_one({"industry": "general"}, {"$push": {"environmental.qualitative": question}}, upsert=True)
        else:
            questions_collection.update_one({"industry": "general"}, {"$push": {"environmental.quantitative": question}}, upsert=True)


@web_server.delete("/api/removeCategory", summary="Remove a category from the list", description="Remove a category from the list")
async def removeCategory(industry: str, claims: dict = Depends(auth0.require_auth)):
    industries_collection.delete_one({}, {"$pull": {"industries": industry}}, upsert=True)

@web_server.delete("/api/removeQuestionGeneral", summary="Remove general question", description="Remove general question from the list")
async def removeQuestionGeneral(type: str, question: str, qualitative: bool = False, claims: dict = Depends(auth0.require_auth)):
    if (type == "social" or type == "governance"):
        questions_collection.delete_one({"industry": "general"}, {"$pull": {type: question}}, upsert=True)
    else:
        if (qualitative):
            questions_collection.delete_one({"industry": "general"}, {"$pull": {"environmental.qualitative": question}}, upsert=True)
        else:
            questions_collection.delete_one({"industry": "general"}, {"$pull": {"environmental.quantitative": question}}, upsert=True)

@web_server.delete("/api/removeQuestionSpecific", summary="Remove specific question", description="Remove industry-specific question from the list")
async def removeQuestionSpecific(industry: str, question: str, qualitative: bool, claims: dict = Depends(auth0.require_auth)):
    if (qualitative):
        questions_collection.delete_one({"industry": industry}, {"$pull": {"qualitative": question}}, upsert=True)
    else:
        questions_collection.delete_one({"industry": industry}, {"$pull": {"quantitative": question}}, upsert=True)

@web_server.get("/api/companies", summary="Fetch companies", description="Fetch all companies and their slugs (UID)")
async def companies():
    # Fetch company names and slugs and send them over
    result = data_collection.find({}, {"_id": 0, "name": 1, "slug": 1, "industry": 1, "country": 1})
    json_dump = list(result)
    print(json_dump)
    return json_dump

@web_server.get("/api/fetchCompany", summary="Fetch data for a company", description="Fetch data for a company")
async def fetchCompany(company_slug: str):
    # Fetch data belonging to a particular company and send
    result = data_collection.find({"slug": company_slug}, {"_id": 0})
    json_dump = list(result)
    return json_dump


@web_server.post("/api/companies/addData", summary="Upload new report", description="Upload new report and autofill details into database")
async def add_data(file: UploadFile = File(...), claims: dict = Depends(auth0.require_auth)):
    file_path = UPLOAD_DIR / file.filename

    with file_path.open("wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # The file has been saved to a directory. Now, start the pipeline
    try:
        pdf_to_context(file_path, "./out", 12000)
        data = extract_data("./out/llm_context.txt")
        dict_json = json.loads(data.json())
        print(dict_json)
        insert_json_into_mongo(dict_json)
    except Exception as e:
        print(e)
        return {
            "error": str(e)
        }
    return {
        "insertion": "Successful"
    }
