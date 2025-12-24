# Takes JSON and throws it into mongodb
from dotenv import load_dotenv
import backends.constants.mongo_client as mongo_client
load_dotenv(verbose=True)


def insert_json_into_mongo(data):
    collection = mongo_client.collection

    update_query = {"name": data["company_name"]}

    # Create data list
    env_data_list = data["environmental_quantities"]

    # Set the slug
    collection.update_one(update_query, {"$set": {"slug": data["company_slug"]}}, upsert=True)

    # Loop over each env commodity to insert data
    for element in env_data_list:
        commodity = element["name"]
        curr_value = element["value"]

        # Add the current quantity
        collection.update_one(update_query, {
            "$push": {f"environmental.{commodity}.current.data": {"year": data['company_year'], "value": curr_value}}},upsert=True)

        # Add the future predictions
        collection.update_one(update_query, {"$push": {f"environmental.{commodity}.future.data": element['future']}}, upsert=True)

        # Add the unit
        collection.update_one(update_query, {"$set": {f"environmental.{commodity}.unit": element["unit"]}},upsert=True)

    social_data_list = data['social_elements']

    for element in social_data_list:
        commodity = element["criterion"]
        statement = element["comment"]

        # Add it in
        collection.update_one(update_query,
                              {"$push": {f"social.{commodity}": {"year": data['company_year'], "statement": statement}}}, upsert=True)

    governance_data_list = data['governance_elements']

    for element in governance_data_list:
        commodity = element["criterion"]
        statement = element["comment"]

        # Add it in
        collection.update_one(update_query, {
            "$push": {f"governance.{commodity}": {"year": data['company_year'], "statement": statement}}}, upsert=True)
