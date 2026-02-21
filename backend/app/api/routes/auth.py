from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.db import get_db
from app.models import Role, User
from app.schemas import LoginIn, LoginOut, RegisterIn

router = APIRouter()

ANONYMOUS_ROLE_NAME = "аноним"


def _get_anonymous_role_id(db: Session) -> int:
    role = db.query(Role).filter(Role.name == ANONYMOUS_ROLE_NAME).first()
    if not role:
        role = Role(name=ANONYMOUS_ROLE_NAME)
        db.add(role)
        db.commit()
        db.refresh(role)
    return role.id


@router.post("/register", response_model=LoginOut, status_code=status.HTTP_201_CREATED)
def register(payload: RegisterIn, db: Session = Depends(get_db)) -> LoginOut:
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
    db.commit()
    db.refresh(user)

    return LoginOut(user=user)


@router.post("/login", response_model=LoginOut)
def login(payload: LoginIn, db: Session = Depends(get_db)) -> LoginOut:
    user = db.query(User).filter(User.email == payload.email).first()
    if not user or not user.check_password(payload.password):
        raise HTTPException(status_code=401, detail="Неверный email или пароль")
    return LoginOut(user=user)
