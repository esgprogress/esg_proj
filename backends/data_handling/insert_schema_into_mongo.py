from dotenv import load_dotenv
import backends.constants.mongo_client as mongo_client
load_dotenv(verbose=True)


def insert_json_into_mongo(data, company_name):
    collection = mongo_client.data_collection

    if company_name != "undefined":
        actual_company_name = company_name
    else:
        actual_company_name = data["company_name"]

    update_query = {"name": actual_company_name}
    year = data["company_year"]

    # ------------------------------------------------------------------
    # Basic company metadata
    # ------------------------------------------------------------------
    collection.update_one(
        update_query,
        {
            "$set": {
                "slug": data["company_slug"],
                "industry": data["company_type"],
                "country": data["company_country"]
            }
        },
        upsert=True
    )

    # ------------------------------------------------------------------
    # ENVIRONMENTAL — QUANTITATIVE
    # ------------------------------------------------------------------
    for element in data.get("environmental_quantities", {}).get("quantitative", []):
        criterion = element["criterion"]
        unit = element["unit"]
        current = element["current"]           # {year, value}
        future = element.get("future", [])     # list of {year, value}

        # Ensure criterion object exists
        collection.update_one(
            {
                **update_query,
                "environmental.quantitative.criterion": {"$ne": criterion}
            },
            {
                "$push": {
                    "environmental.quantitative": {
                        "criterion": criterion,
                        "unit": unit,
                        "current": [],
                        "future": []
                    }
                }
            },
            upsert=True
        )

        # Push CURRENT year data
        collection.update_one(
            update_query,
            {
                "$push": {
                    "environmental.quantitative.$[elem].current": current
                }
            },
            array_filters=[{"elem.criterion": criterion}]
        )

        # Push FUTURE data (list-safe)
        if future:
            collection.update_one(
                update_query,
                {
                    "$push": {
                        "environmental.quantitative.$[elem].future": {
                            "$each": future
                        }
                    }
                },
                array_filters=[{"elem.criterion": criterion}]
            )

    # ------------------------------------------------------------------
    # ENVIRONMENTAL — QUALITATIVE
    # ------------------------------------------------------------------
    for element in data.get("environmental_quantities", {}).get("qualitative", []):
        criterion = element["criterion"]
        comment = element.get("comment", "")

        # Ensure criterion exists
        collection.update_one(
            {
                **update_query,
                "environmental.qualitative.criterion": {"$ne": criterion}
            },
            {
                "$push": {
                    "environmental.qualitative": {
                        "criterion": criterion,
                        "history": []
                    }
                }
            },
            upsert=True
        )

        # Push yearly comment
        collection.update_one(
            update_query,
            {
                "$push": {
                    "environmental.qualitative.$[elem].history": {
                        "year": year,
                        "comment": comment
                    }
                }
            },
            array_filters=[{"elem.criterion": criterion}]
        )

    # ------------------------------------------------------------------
    # SOCIAL
    # ------------------------------------------------------------------
    for element in data.get("social_elements", []):
        criterion = element["criterion"]
        rating = element["rating"]

        # Ensure criterion exists
        collection.update_one(
            {
                **update_query,
                "social.criterion": {"$ne": criterion}
            },
            {
                "$push": {
                    "social": {
                        "criterion": criterion,
                        "history": []
                    }
                }
            },
            upsert=True
        )

        # Push yearly rating
        collection.update_one(
            update_query,
            {
                "$push": {
                    "social.$[elem].history": {
                        "year": year,
                        "rating": rating
                    }
                }
            },
            array_filters=[{"elem.criterion": criterion}]
        )

    # ------------------------------------------------------------------
    # GOVERNANCE
    # ------------------------------------------------------------------
    for element in data.get("governance_elements", []):
        criterion = element["criterion"]
        rating = element["rating"]

        # Ensure criterion exists
        collection.update_one(
            {
                **update_query,
                "governance.criterion": {"$ne": criterion}
            },
            {
                "$push": {
                    "governance": {
                        "criterion": criterion,
                        "history": []
                    }
                }
            },
            upsert=True
        )

        # Push yearly rating
        collection.update_one(
            update_query,
            {
                "$push": {
                    "governance.$[elem].history": {
                        "year": year,
                        "rating": rating
                    }
                }
            },
            array_filters=[{"elem.criterion": criterion}]
        )
