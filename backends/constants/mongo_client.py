from pymongo import MongoClient
from dotenv import load_dotenv
import os

load_dotenv(verbose=True)

client = MongoClient(os.getenv("MONGODB_INSTANCE_URL"))
database = client[os.getenv("MONGODB_DATABASE")]
collection = database[os.getenv("MONGODB_COLLECTION_NAME")]