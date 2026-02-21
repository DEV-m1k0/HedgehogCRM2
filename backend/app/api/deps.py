from __future__ import annotations

from fastapi import Depends, Header, HTTPException, status
from sqlalchemy.orm import Session

from app.db import get_db
from app.models import User, UserSession
from app.security import decode_token, now_utc


def get_current_user(
    authorization: str | None = Header(default=None, alias="Authorization"),
    db: Session = Depends(get_db),
) -> User:
    if not authorization or not authorization.lower().startswith("bearer "):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Требуется Bearer токен")

    token = authorization.split(" ", 1)[1].strip()
    payload = decode_token(token, expected_type="access")
    user_id_raw = payload.get("sub")
    session_id = payload.get("sid")
    if not user_id_raw or not session_id:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Некорректный payload токена")

    try:
        user_id = int(user_id_raw)
    except ValueError as exc:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Некорректный user id в токене") from exc

    session = db.query(UserSession).filter(UserSession.session_id == session_id).first()
    if not session or not session.is_active:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Сессия завершена")
    if session.expires_at and session.expires_at < now_utc():
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Сессия истекла")

    user = db.get(User, user_id)
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Пользователь не найден")
    return user


def get_admin_user(current_user: User = Depends(get_current_user)) -> User:
    role_name = (current_user.role.name if current_user.role else "").lower()
    if "администратор" not in role_name and "admin" not in role_name:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Доступ только для администратора")
    return current_user
