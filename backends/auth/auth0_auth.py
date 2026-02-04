from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from jose import jwt
from dotenv import load_dotenv
import requests
import os

ALGORITHMS = ["RS256"]
security = HTTPBearer()
load_dotenv(verbose=True)

AUTH0_DOMAIN = os.getenv("AUTH0_DOMAIN")
API_AUDIENCE = os.getenv("API_AUDIENCE")
ISSUER = f"https://{AUTH0_DOMAIN}/"

jwks = requests.get(
    f"https://{AUTH0_DOMAIN}/.well-known/jwks.json"
).json()

def get_rsa_key(token):
    header = jwt.get_unverified_header(token)

    for key in jwks["keys"]:
        if key["kid"] == header["kid"]:
            return key

    # refresh keys
    new_jwks = requests.get(
        f"https://{AUTH0_DOMAIN}/.well-known/jwks.json"
    ).json()
    jwks["keys"] = new_jwks["keys"]

    for key in jwks["keys"]:
        if key["kid"] == header["kid"]:
            return key

    return None

def verify_token(token: str):
    try:
        rsa_key = get_rsa_key(token)
        if not rsa_key:
            raise HTTPException(status_code=401, detail="Invalid key ID")

        payload = jwt.decode(
            token,
            rsa_key,
            algorithms=ALGORITHMS,
            audience=API_AUDIENCE,
            issuer=ISSUER,
        )
        return payload

    except Exception as e:
        print("JWT ERROR:", e)
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token"
        )

def get_user(
    credentials: HTTPAuthorizationCredentials = Depends(security)
):
    return verify_token(credentials.credentials)
