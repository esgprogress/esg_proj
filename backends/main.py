import shutil
from pathlib import Path
from fastapi import FastAPI, UploadFile, File
from backends.constants.mongo_client import collection
import json
from backends.data_handling.insert_schema_into_mongo import insert_json_into_mongo
from backends.data_handling.json_schema_gpt import extract_data
from backends.data_handling.pdf_to_llm_context import pdf_to_context
from bson.json_util import dumps

# Instantiate an instance of the FastAPI client
web_server = FastAPI()
UPLOAD_DIR = Path("uploads")
UPLOAD_DIR.mkdir(exist_ok=True)
import sys, os
print("CWD:", os.getcwd())
print("sys.path:", sys.path)

@web_server.get("/api/companies")
async def companies():
    # Fetch company names and slugs and send them over
    result = collection.find({}, {"_id": 0, "name": 1, "slug": 1})
    json_dump = list(result)
    return json_dump


@web_server.post("/api/companies/addData")
async def add_data(file: UploadFile = File(...)):
    file_path = UPLOAD_DIR / file.filename

    with file_path.open("wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # The file has been saved to a directory. Now, start the pipeline
    try:
        pdf_to_context(file_path, "./out", 12000)
        data = extract_data("./out/llm_context.txt")
        dict_json = json.loads(data.json())
        print(type(dict_json))
        insert_json_into_mongo(dict_json)
    except Exception as e:
        print(e)
        return {
            "error": str(e)
        }
    return {
        "insertion": "Successful"
    }
