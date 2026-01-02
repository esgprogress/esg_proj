from fastapi import Depends, HTTPException
from fastapi.security import HTTPBearer
from jose import jwt
import requests
from dotenv import load_dotenv
import os

load_dotenv(verbose=True)

ALGORITHMS = ["RS256"]

security = HTTPBearer()

jwks = requests.get(
    f"https://{os.getenv('AUTH0_DOMAIN')}/.well-known/jwks.json"
).json()

def verify_token(token: str):
    try:
        header = jwt.get_unverified_header(token)
        key = next(k for k in jwks["keys"] if k["kid"] == header["kid"])

        payload = jwt.decode(
            token,
            key,
            algorithms=ALGORITHMS,
            audience=os.getenv('API_AUDIENCE'),
            issuer=f"https://{os.getenv('AUTH0_DOMAIN')}/",
        )
        return payload
    except Exception:
        raise HTTPException(status_code=401, detail="Invalid token")

def get_user(credentials=Depends(security)):
    return verify_token(credentials.credentials)
