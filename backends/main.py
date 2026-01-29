import logging
import shutil
import os
from pathlib import Path
from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.params import Depends
from pymongo.errors import PyMongoError
from starlette import status
from starlette.middleware.cors import CORSMiddleware
from starlette.responses import FileResponse

from backends.auth.auth0_auth import auth0
from backends.constants.mongo_client import data_collection, industries_collection, questions_collection, database
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
logger = logging.getLogger("app.log")

# Instantiate an instance of the FastAPI client
web_server = FastAPI(title="ESGProject")
UPLOAD_DIR = Path("uploads")
UPLOAD_DIR.mkdir(exist_ok=True)
import sys, os

print("CWD:", os.getcwd())
print("sys.path:", sys.path)

web_server.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "https://esgprogress.org", "https://docs.esgprogress.org",
                   "http://localhost:3002", "https://www.esgprogress.org", "https://api.esgprogress.org"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

web_server.add_middleware(
    RouterLoggingMiddleware,
    logger=logging.getLogger(__name__),
)


@web_server.get(
    "/api/fetchIndustries",
    summary="Retrieve industries",
    description="Retrieve all currently-supported industries",
)
async def fetchIndustries():
    try:
        # Query MongoDB
        cursor = industries_collection.find({}, {"_id": 0})

        # Materialize results
        industries = list(cursor)

        if not industries:
            # Not an error, but useful to signal explicitly
            logger.info("fetchIndustries: no industries found")
            return []

        return industries

    except PyMongoError as e:
        # Database-specific failures
        logger.exception("MongoDB error in fetchIndustries: " + str(e))
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Database temporarily unavailable",
        )

    except Exception as e:
        # Catch-all for unexpected failures
        logger.exception("Unexpected error in fetchIndustries: " + str(e))
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Internal server error",
        )


@web_server.get("/api/fetchCompaniesByIndustry", summary="Retrieve companies in industry",
                description="Retrieve all companies operating in a given industry")
async def fetchCompaniesByIndustry(industry: str):
    try:
        # Query MongoDB
        result = data_collection.find({"industry": industry},
                                      {"_id": 0, "industry": 1, "name": 1, "country": 1, "slug": 1})

        # Pull results into eagerly evaluated format
        json_dump = list(result)

        if not json_dump:
            logger.info("no companies for the given industry " + industry)
        return json_dump
    except PyMongoError as e:
        # Database failures (not empty string, but internal failure
        logger.exception("MongoDB error in fetchCompaniesByIndustry: " + str(e))
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Database temporarily unavailable",
        )
    except Exception as e:
        # Broad catcher
        logger.exception("Unexpected error in fetchCompaniesByIndustry: " + str(e))
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Internal server error"
        )


@web_server.get("/api/fetchQuestions", summary="Fetch questions",
                description="Fetch all questions for companies operating in a given industry")
async def fetchQuestions(industry: str):
    try:
        # Mongo queries
        questions = questions_collection.find({}, {"_id": 0})[0]
        environmental = questions['environmental']
        social = questions['social']
        governance = questions['governance']
        industry = questions[industry]

        response_dict = {
            "environmental": environmental,
            "social": social,
            "governance": governance,
            "industry": industry
        }

        return response_dict

    except PyMongoError as e:
        # Database errors
        logger.exception("MongoDB error in fetchQuestions: " + str(e))
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Database error in MongoDB"
        )

    except Exception as e:
        # General broad-catching exceptions
        logger.exception("General system error: " + str(e))
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Internal server error"
        )


@web_server.put("/api/addQuestionSpecific", summary="Add new question to env list of industry",
                description="Given a particular industry, add a new question to the list of industry-specific questions that will be asked")
async def addQuestionSpecific(industry: str, question: str, qualitative: bool,
                              claims: dict = Depends(auth0.require_auth)):
    try:
        if qualitative:
            questions_collection.update_one({"industry": industry}, {"$push": {"qualitative": question}}, upsert=True)
        else:
            questions_collection.update_one({"industry": industry}, {"$push": {"quantitative": question}}, upsert=True)

    except PyMongoError as e:
        # DB error
        logger.exception("MongoDB error in addQuestionSpecific: " + str(e))
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Database error in MongoDB"
        )

    except Exception as e:
        # Broad exception
        logger.exception("General system error :" + str(e))
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Internal server error"
        )


@web_server.put("/api/addCategory", summary="Add new industry category",
                description="Add a new industry category to the list of industries")
async def addCategory(industry: str, claims: dict = Depends(auth0.require_auth)):
    try:
        industries_collection.update_one({}, {"$push": {"industries": industry}}, upsert=True)

    except PyMongoError as e:
        # DB error, so return 503
        logger.exception("MongoDB error in addCategory: " + str(e))
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Database error in MongoDB"
        )

    except Exception as e:
        # Broad exception
        logger.exception("General system error :" + str(e))
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Internal server error"
        )


@web_server.put("/api/addQuestionGeneral", summary="Add new generic question",
                description="Add a new generic question to the list of questions that every company is subjected to")
async def addQuestionGeneral(type: str, question: str, qualitative: bool = False,
                             claims: dict = Depends(auth0.require_auth)):
    try:
        if type == "social" or type == "governance":
            questions_collection.update_one({"industry": "general"}, {"$push": {type: question}}, upsert=True)
        else:
            if qualitative:
                questions_collection.update_one({"industry": "general"},
                                                {"$push": {"environmental.qualitative": question}}, upsert=True)
            else:
                questions_collection.update_one({"industry": "general"},
                                                {"$push": {"environmental.quantitative": question}}, upsert=True)

    except PyMongoError as e:
        # DB Error
        logger.exception("MongoDB error in addQuestionGeneral: " + str(e))
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Database error in MongoDB"
        )

    except Exception as e:
        # General system error
        logger.exception("General system error :" + str(e))
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Internal server error"
        )


@web_server.delete("/api/removeCategory", summary="Remove a category from the list",
                   description="Remove a category from the list")
async def removeCategory(industry: str, claims: dict = Depends(auth0.require_auth)):
    try:
        industries_collection.delete_one({}, {"$pull": {"industries": industry}}, upsert=True)

    except PyMongoError as e:
        # Database error
        logger.exception("MongoDB error in removeCategory: " + str(e))
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Database error in MongoDB"
        )

    except Exception as e:
        # Broad exception
        logger.exception("General system error :" + str(e))
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Internal server error"
        )


@web_server.delete("/api/removeQuestionGeneral", summary="Remove general question",
                   description="Remove general question from the list")
async def removeQuestionGeneral(type: str, question: str, qualitative: bool = False,
                                claims: dict = Depends(auth0.require_auth)):
    try:
        if type == "social" or type == "governance":
            questions_collection.delete_one({"industry": "general"}, {"$pull": {type: question}}, upsert=True)
        else:
            if qualitative:
                questions_collection.delete_one({"industry": "general"},
                                                {"$pull": {"environmental.qualitative": question}}, upsert=True)
            else:
                questions_collection.delete_one({"industry": "general"},
                                                {"$pull": {"environmental.quantitative": question}}, upsert=True)

    except PyMongoError as e:
        # Database error
        logger.exception("MongoDB error in removeQuestionGeneral: " + str(e))
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Database error in MongoDB"
        )

    except Exception as e:
        # General system error
        logger.exception("General system error :" + str(e))
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Internal server error"
        )


@web_server.delete("/api/removeQuestionSpecific", summary="Remove specific question",
                   description="Remove industry-specific question from the list")
async def removeQuestionSpecific(industry: str, question: str, qualitative: bool,
                                 claims: dict = Depends(auth0.require_auth)):
    try:
        if qualitative:
            questions_collection.delete_one({"industry": industry}, {"$pull": {"qualitative": question}}, upsert=True)
        else:
            questions_collection.delete_one({"industry": industry}, {"$pull": {"quantitative": question}}, upsert=True)

    except PyMongoError as e:
        # DB error
        logger.exception("MongoDB error in removeQuestionSpecific: " + str(e))
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Database error in MongoDB"
        )

    except Exception as e:
        # General errors
        logger.exception("General system error :" + str(e))
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Internal server error"
        )


@web_server.get("/api/companies", summary="Fetch companies", description="Fetch all companies and their slugs (UID)")
async def companies():
    # Fetch company names and slugs and send them over
    try:
        # Find all items from data_collection and dont return any internal index values
        result = data_collection.find({}, {"_id": 0, "name": 1, "slug": 1, "industry": 1, "country": 1})

        # Convert to eagerly evaluated format
        json_dump = list(result)

        if not json_dump:
            logger.info("No companies found in database")
        return json_dump

    except PyMongoError as e:
        # DB error
        logger.exception("MongoDB error in companies: " + str(e))
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Database error in MongoDB"
        )

    except Exception as e:
        # Broad catcher
        logger.exception("General system error :" + str(e))
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Internal server error"
        )


@web_server.get("/api/fetchCompany", summary="Fetch data for a company", description="Fetch data for a company")
async def fetchCompany(company_slug: str):
    # Fetch data belonging to a particular company and send
    try:
        result = data_collection.find({"slug": company_slug}, {"_id": 0})

        # Convert to eagerly evaluated format
        json_dump = list(result)
        if not json_dump:
            logger.info("No data belonging to company " + company_slug)
        return json_dump

    except PyMongoError as e:
        logger.exception("MongoDB error in fetchCompany: " + str(e))
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Database error in MongoDB"
        )

    except Exception as e:
        logger.exception("General system error :" + str(e))
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Internal server error"
        )


@web_server.post("/api/companies/addData", summary="Upload new report",
                 description="Upload new report and autofill details into database")
async def add_data(company_name: str, file: UploadFile = File(...), claims: dict = Depends(auth0.require_auth)):
    logger.warning("add_data CALLED")

    file_path = UPLOAD_DIR / file.filename

    with file_path.open("wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # The file has been saved to a directory. Now, start the pipeline
    try:
        pdf_to_context(file_path, "./out", 12000)
        data = extract_data("./out/llm_context.txt")
        dict_json = json.loads(data.json())
        insert_json_into_mongo(dict_json, company_name)

        # Rename and reorganize
        if company_name == "undefined":
            destination = UPLOAD_DIR / dict_json['company_name'] / f"{dict_json['company_year']}.pdf"
        else:
            destination = UPLOAD_DIR / company_name / f"{dict_json['company_year']}.pdf"
        destination.parent.mkdir(parents=True, exist_ok=True)
        os.rename(file_path, destination)

    except PyMongoError as e:
        logger.exception("MongoDB error in add_data: " + str(e))
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Database error in MongoDB"
        )

    except Exception as e:
        logger.exception("General system error :" + str(e))
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Internal server error"
        )


@web_server.get("/api/proof/fetchData", summary="Fetch proof data", description="Fetch proof data for a given company")
async def fetchProofData(company_slug: str):
    try:
        # Fetch current company name
        company_name_result = data_collection.find({"slug": company_slug}, {"_id": 0, "name": 1, "slug": 1})
        json_dump = list(company_name_result)
        if not json_dump:
            logger.info("Company not found for slug " + company_slug)
            return []
        else:
            main_company_name = json_dump[0]['name']

            # Now, create the file path and return the file names
            main_file_path = UPLOAD_DIR / main_company_name

            if not os.path.exists(main_file_path):
                return []

            files_in_main_file_path = os.listdir(main_file_path)

            files = []
            for file in files_in_main_file_path:
                if (file.endswith(".pdf")):
                    size = round(os.path.getsize(main_file_path / file) / 1048576, 2)
                    file_splits = file.split(".")
                    files.append({"file_name": ".".join(file_splits[:len(file_splits) - 1]), "file_type": file_splits[-1], "size": size})

            return files

    except PyMongoError as e:
        logger.exception("MongoDB error in fetchProofData: " + str(e))
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Database error in MongoDB"
        )

    except Exception as e:
        logger.exception("General system error :" + str(e))
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Internal server error"
        )


@web_server.get('/api/proof/downloadData', summary="Download proof data",
                description="Download a given proof data file")
async def downloadProofData(company_slug: str, file_name: str, file_type: str):
    try:
        company_name_result = data_collection.find({"slug": company_slug}, {"_id": 0, "name": 1, "slug": 1})
        json_dump = list(company_name_result)
        if not json_dump:
            logger.info("Company not found for slug " + company_slug)
            return []
        else:
            main_company_name = json_dump[0]['name']
            file_dir = UPLOAD_DIR / main_company_name / (file_name + "." + file_type)
            if not file_dir.exists():
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND,
                    detail="company doesn't exist"
                )
            return FileResponse(str(file_dir), filename=(file_name + "." + file_type), media_type='application/pdf')
    except Exception as e:
        logger.exception("General system error :" + str(e))
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Internal server error"
        )


@web_server.get('/api/health_check', summary="Health check", description="Health check")
async def healthCheck():
    try:
        db_health = database.command("ping")
        return db_health
    except PyMongoError as e:
        logger.exception("MongoDB error in health check: " + str(e))
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Database error in MongoDB"
        )

    except Exception as e:
        logger.exception("General system error :" + str(e))
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Internal server error"
        )


@web_server.get('/api/companies/logo', summary="Fetch company logo", description="Fetch company logo")
async def getCompanyLogo(company_slug: str):
    try:
        # Fetch current company name
        company_name_result = data_collection.find({"slug": company_slug},
                                                   {"_id": 0, "name": 1, "slug": 1, "image_filepath": 1})
        json_dump = list(company_name_result)
        if not json_dump:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="company doesn't exist"
            )
        else:
            company_filepath_wrt_upload_dir = json_dump[0]["image_filepath"]
            company_name = json_dump[0]["name"]

            # Create filepath
            image_filepath = UPLOAD_DIR / company_name / company_filepath_wrt_upload_dir

            # Check for existence
            if not os.path.exists(image_filepath):
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND,
                    detail="company image doesn't exist"
                )

            head, tail = os.path.split(image_filepath)
            [name, extension] = tail.split(".")

            return FileResponse(str(image_filepath), filename=tail, media_type=f"image/{extension}")

    except PyMongoError as e:
        logger.exception("MongoDB error in getCompanyLogo: " + str(e))
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Database error in MongoDB"
        )

    except Exception as e:
        logger.exception("General system error :" + str(e))
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Internal server error"
        )


@web_server.post('/api/companies/logo', summary="Upload or change company logo",
                 description="Upload or change company logo")
async def uploadCompanyLogo(company_slug: str, file: UploadFile = File(...),
                            claims: dict = Depends(auth0.require_auth)):
    try:
        # step 1: find company name
        company_name_result = data_collection.find({"slug": company_slug},
                                                   {"_id": 0, "name": 1, "slug": 1, "image_filepath": 1})
        json_dump = list(company_name_result)
        if not json_dump:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="company doesn't exist"
            )

        else:
            temporary_file_path = UPLOAD_DIR / file.filename

            with temporary_file_path.open("wb") as buffer:
                shutil.copyfileobj(file.file, buffer)

            main_company_name = json_dump[0]['name']
            permanent_file_dir = UPLOAD_DIR / main_company_name / (
                        file.filename)
            permanent_file_dir.parent.mkdir(parents=True, exist_ok=True)
            os.rename(temporary_file_path, permanent_file_dir)

            # delete the old file
            if "image_filepath" in json_dump[0].keys():
                old_company_logo = json_dump[0]['image_filepath']
                old_company_logo_fullpath = UPLOAD_DIR / old_company_logo
                if old_company_logo_fullpath.exists():
                    old_company_logo_fullpath.unlink()

            # add the new filepath in the database
            data_collection.update_one({"slug": company_slug},
                                       {"$set": {"image_filepath": file.filename}})

    except PyMongoError as e:
        logger.exception("MongoDB error in uploadCompanyLogo: " + str(e))
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Database error in MongoDB"
        )

    except Exception as e:
        logger.exception("General system error :" + str(e))
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Internal server error"
        )
