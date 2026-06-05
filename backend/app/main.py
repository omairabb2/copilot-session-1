from datetime import datetime, timedelta, timezone
import os

from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from jose import JWTError, jwt
from passlib.context import CryptContext
from pydantic import BaseModel

SECRET_KEY = os.getenv("JWT_SECRET_KEY", "change-this-in-production")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_SECONDS = 300
REFRESH_TOKEN_EXPIRE_SECONDS = 1800

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

app = FastAPI(title="FastAPI JWT Example", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)


class LoginRequest(BaseModel):
    username: str
    password: str


class RefreshRequest(BaseModel):
    refresh_token: str


class TokenResponse(BaseModel):
    access_token: str
    token_type: str
    expires_in: int
    refresh_token: str


admin_hashed_password = pwd_context.hash("admin123")
fake_user_db = {
    "admin": {
        "username": "admin",
        "hashed_password": admin_hashed_password,
    }
}


def create_token(subject: str, token_type: str, expires_in_seconds: int) -> str:
    now = datetime.now(timezone.utc)
    payload = {
        "sub": subject,
        "type": token_type,
        "iat": int(now.timestamp()),
        "exp": now + timedelta(seconds=expires_in_seconds),
    }
    return jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)


def decode_token(token: str) -> dict:
    try:
        return jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
    except JWTError as exc:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired token",
        ) from exc


@app.get("/health")
def health() -> dict:
    return {"status": "ok"}


@app.post("/auth/token", response_model=TokenResponse)
def login(payload: LoginRequest) -> TokenResponse:
    user = fake_user_db.get(payload.username)
    if not user or not pwd_context.verify(payload.password, user["hashed_password"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials",
        )

    access_token = create_token(
        subject=user["username"],
        token_type="access",
        expires_in_seconds=ACCESS_TOKEN_EXPIRE_SECONDS,
    )
    refresh_token = create_token(
        subject=user["username"],
        token_type="refresh",
        expires_in_seconds=REFRESH_TOKEN_EXPIRE_SECONDS,
    )

    return TokenResponse(
        access_token=access_token,
        token_type="bearer",
        expires_in=ACCESS_TOKEN_EXPIRE_SECONDS,
        refresh_token=refresh_token,
    )


@app.post("/auth/refresh", response_model=TokenResponse)
def refresh_token(payload: RefreshRequest) -> TokenResponse:
    token_payload = decode_token(payload.refresh_token)
    username = token_payload.get("sub")
    token_type = token_payload.get("type")

    if token_type != "refresh" or not username:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid refresh token",
        )

    user = fake_user_db.get(username)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User not found",
        )

    new_access_token = create_token(
        subject=username,
        token_type="access",
        expires_in_seconds=ACCESS_TOKEN_EXPIRE_SECONDS,
    )
    new_refresh_token = create_token(
        subject=username,
        token_type="refresh",
        expires_in_seconds=REFRESH_TOKEN_EXPIRE_SECONDS,
    )

    return TokenResponse(
        access_token=new_access_token,
        token_type="bearer",
        expires_in=ACCESS_TOKEN_EXPIRE_SECONDS,
        refresh_token=new_refresh_token,
    )
