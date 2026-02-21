from __future__ import annotations

import hashlib
import os
from datetime import UTC, datetime, timedelta
from typing import Any

import jwt
from fastapi import HTTPException, status

JWT_SECRET = os.getenv("JWT_SECRET", "change-me-in-production-very-long-random-secret")
JWT_ALGORITHM = "HS256"
ACCESS_TOKEN_MINUTES = int(os.getenv("JWT_ACCESS_MINUTES", "15"))
REFRESH_TOKEN_DAYS = int(os.getenv("JWT_REFRESH_DAYS", "14"))


def now_utc() -> datetime:
    return datetime.now(UTC).replace(tzinfo=None)


def make_access_token(user_id: int, session_id: str) -> str:
    exp = datetime.now(UTC) + timedelta(minutes=ACCESS_TOKEN_MINUTES)
    payload = {
        "sub": str(user_id),
        "sid": session_id,
        "type": "access",
        "iat": int(datetime.now(UTC).timestamp()),
        "exp": exp,
    }
    return jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)


def make_refresh_token(user_id: int, session_id: str) -> str:
    exp = datetime.now(UTC) + timedelta(days=REFRESH_TOKEN_DAYS)
    payload = {
        "sub": str(user_id),
        "sid": session_id,
        "type": "refresh",
        "iat": int(datetime.now(UTC).timestamp()),
        "exp": exp,
    }
    return jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)


def decode_token(token: str, expected_type: str | None = None) -> dict[str, Any]:
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
    except jwt.ExpiredSignatureError as exc:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Токен истек") from exc
    except jwt.InvalidTokenError as exc:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Некорректный токен") from exc

    token_type = payload.get("type")
    if expected_type and token_type != expected_type:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Некорректный тип токена")
    return payload


def hash_token(value: str) -> str:
    return hashlib.sha256(value.encode("utf-8")).hexdigest()
