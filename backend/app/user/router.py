from fastapi import APIRouter, Request
from fastapi.responses import JSONResponse

from app.models import User

from database import SessionLocal

router = APIRouter()

@router.post("/user/register")
async def register(request: Request):
    new_user_data = await request.json()
    new_user = User(
        email=new_user_data["email"],
        password=new_user_data["password"],
        first_name=new_user_data["firstName"],
        second_name=new_user_data["secondName"],
        patronymic=new_user_data["patronymic"],
    )

    session = SessionLocal()
    session.add(new_user)
    session.commit()

    return JSONResponse({
        "user": new_user.to_dict()
        }, status_code=201)

@router.post("/user/login")
async def login(request: Request):
    user_data = await request.json()

    session = SessionLocal()
    user = session.query(User).filter_by(email=user_data["email"]).first()
    
    if user and user.check_password(user_data["password"]):
        return JSONResponse({
            "user": user.to_dict()
        }, status_code=200)

    return JSONResponse({"error": "Неправильный логин или пароль"}, status_code=401)