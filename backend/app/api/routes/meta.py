from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db import get_db
from app.models import Role, User
from app.schemas import MessageOut, RoleRead, UserRead

router = APIRouter()


@router.get("/health", response_model=MessageOut)
def healthcheck() -> MessageOut:
    return MessageOut(message="ok")


@router.get("/roles", response_model=list[RoleRead])
def list_roles(db: Session = Depends(get_db)) -> list[Role]:
    return db.query(Role).order_by(Role.id).all()


@router.get("/users", response_model=list[UserRead])
def list_users(db: Session = Depends(get_db)) -> list[User]:
    return db.query(User).order_by(User.id).all()
