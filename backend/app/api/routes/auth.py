from __future__ import annotations

import os
import uuid
from datetime import timedelta

from fastapi import APIRouter, Cookie, Depends, Header, HTTPException, Request, Response, status
from sqlalchemy.orm import Session

from app.api.deps import get_current_user
from app.db import get_db
from app.models import AuditLog, Role, User, UserSession
from app.schemas import AccessTokenOut, LoginIn, LoginOut, RegisterIn
from app.security import (
    REFRESH_TOKEN_DAYS,
    decode_token,
    hash_token,
    make_access_token,
    make_refresh_token,
    now_utc,
)

router = APIRouter()

ANONYMOUS_ROLE_NAME = "аноним"
REFRESH_COOKIE_NAME = "refresh_token"


def _set_refresh_cookie(response: Response, refresh_token: str) -> None:
    is_secure = os.getenv("JWT_COOKIE_SECURE", "false").lower() == "true"
    response.set_cookie(
        key=REFRESH_COOKIE_NAME,
        value=refresh_token,
        httponly=True,
        secure=is_secure,
        samesite="lax",
        max_age=int(timedelta(days=REFRESH_TOKEN_DAYS).total_seconds()),
        path="/auth",
    )


def _clear_refresh_cookie(response: Response) -> None:
    response.delete_cookie(REFRESH_COOKIE_NAME, path="/auth")


def _get_anonymous_role_id(db: Session) -> int:
    role = db.query(Role).filter(Role.name == ANONYMOUS_ROLE_NAME).first()
    if not role:
        role = Role(name=ANONYMOUS_ROLE_NAME)
        db.add(role)
        db.commit()
        db.refresh(role)
    return role.id


def _issue_tokens_for_session(db: Session, user: User, request: Request) -> tuple[str, str, str]:
    session_id = uuid.uuid4().hex
    access_token = make_access_token(user.id, session_id)
    refresh_token = make_refresh_token(user.id, session_id)

    db.add(
        UserSession(
            session_id=session_id,
            user_id=user.id,
            ip_address=request.headers.get("X-Forwarded-For", "").split(",")[0].strip() or (request.client.host if request.client else None),
            user_agent=request.headers.get("user-agent"),
            refresh_token_hash=hash_token(refresh_token),
            expires_at=now_utc() + timedelta(days=REFRESH_TOKEN_DAYS),
        )
    )
    return access_token, refresh_token, session_id


@router.post("/register", response_model=LoginOut, status_code=status.HTTP_201_CREATED)
def register(payload: RegisterIn, request: Request, response: Response, db: Session = Depends(get_db)) -> LoginOut:
    existing = db.query(User).filter(User.email == payload.email).first()
    if existing:
        raise HTTPException(status_code=409, detail="Пользователь с таким email уже существует")

    user = User(
        email=payload.email,
        first_name=payload.first_name,
        second_name=payload.second_name,
        patronymic=payload.patronymic,
        role_id=_get_anonymous_role_id(db),
        is_accepted=False,
    )
    user.set_password(payload.password)

    db.add(user)
    db.flush()

    access_token, refresh_token, session_id = _issue_tokens_for_session(db, user, request)
    db.add(
        AuditLog(
            user_id=user.id,
            session_id=session_id,
            action="auth_register",
            method="POST",
            path="/auth/register",
            status_code=201,
        )
    )
    db.commit()
    db.refresh(user)
    _set_refresh_cookie(response, refresh_token)
    return LoginOut(user=user, access_token=access_token)


@router.post("/login", response_model=LoginOut)
def login(payload: LoginIn, request: Request, response: Response, db: Session = Depends(get_db)) -> LoginOut:
    user = db.query(User).filter(User.email == payload.email).first()
    if not user or not user.check_password(payload.password):
        raise HTTPException(status_code=401, detail="Неверный email или пароль")

    access_token, refresh_token, session_id = _issue_tokens_for_session(db, user, request)
    db.add(
        AuditLog(
            user_id=user.id,
            session_id=session_id,
            action="auth_login",
            method="POST",
            path="/auth/login",
            status_code=200,
        )
    )
    db.commit()
    _set_refresh_cookie(response, refresh_token)
    return LoginOut(user=user, access_token=access_token)


@router.post("/refresh", response_model=AccessTokenOut)
def refresh_access_token(
    response: Response,
    refresh_token: str | None = Cookie(default=None, alias=REFRESH_COOKIE_NAME),
    db: Session = Depends(get_db),
) -> AccessTokenOut:
    if not refresh_token:
        raise HTTPException(status_code=401, detail="Refresh токен отсутствует")

    payload = decode_token(refresh_token, expected_type="refresh")
    session_id = payload.get("sid")
    user_id_raw = payload.get("sub")
    if not session_id or not user_id_raw:
        raise HTTPException(status_code=401, detail="Некорректный refresh токен")

    try:
        user_id = int(user_id_raw)
    except ValueError as exc:
        raise HTTPException(status_code=401, detail="Некорректный user id в refresh токене") from exc

    session = db.query(UserSession).filter(UserSession.session_id == session_id, UserSession.user_id == user_id).first()
    if not session or not session.is_active:
        raise HTTPException(status_code=401, detail="Сессия неактивна")
    if session.refresh_token_hash != hash_token(refresh_token):
        session.is_active = False
        session.revoked_at = now_utc()
        session.ended_at = now_utc()
        db.add(
            AuditLog(
                user_id=user_id,
                session_id=session_id,
                action="auth_refresh_replay_detected",
                method="POST",
                path="/auth/refresh",
                status_code=401,
            )
        )
        db.commit()
        raise HTTPException(status_code=401, detail="Refresh токен отозван")
    if session.expires_at and session.expires_at < now_utc():
        session.is_active = False
        session.ended_at = now_utc()
        db.commit()
        raise HTTPException(status_code=401, detail="Сессия истекла")

    user = db.get(User, user_id)
    if not user:
        raise HTTPException(status_code=401, detail="Пользователь не найден")

    # Rotate refresh token on each refresh request.
    new_access = make_access_token(user.id, session_id)
    new_refresh = make_refresh_token(user.id, session_id)
    session.refresh_token_hash = hash_token(new_refresh)
    session.last_seen_at = now_utc()
    db.add(
        AuditLog(
            user_id=user.id,
            session_id=session_id,
            action="auth_refresh",
            method="POST",
            path="/auth/refresh",
            status_code=200,
        )
    )
    db.commit()
    _set_refresh_cookie(response, new_refresh)
    return AccessTokenOut(access_token=new_access)


@router.post("/logout", status_code=status.HTTP_200_OK)
def logout(
    response: Response,
    authorization: str | None = Header(default=None, alias="Authorization"),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> dict[str, str]:
    session_id: str | None = None
    if authorization and authorization.lower().startswith("bearer "):
        token = authorization.split(" ", 1)[1].strip()
        payload = decode_token(token, expected_type="access")
        session_id = payload.get("sid")

    if session_id:
        session = db.query(UserSession).filter(UserSession.session_id == session_id, UserSession.user_id == current_user.id).first()
        if session and session.is_active:
            session.is_active = False
            session.revoked_at = now_utc()
            session.ended_at = now_utc()
            db.add(
                AuditLog(
                    user_id=current_user.id,
                    session_id=session_id,
                    action="auth_logout",
                    method="POST",
                    path="/auth/logout",
                    status_code=200,
                )
            )
            db.commit()

    _clear_refresh_cookie(response)
    return {"message": "Выход выполнен"}
