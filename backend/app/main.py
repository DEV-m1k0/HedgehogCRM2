from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from app.api.router import api_router
from app.db import SessionLocal, engine
from app.models import Base, Role

DEFAULT_ROLES = ["администратор", "менеджер", "преподаватель", "аноним"]


def _seed_roles() -> None:
    db: Session = SessionLocal()
    try:
        for role_name in DEFAULT_ROLES:
            exists = db.query(Role).filter(Role.name == role_name).first()
            if not exists:
                db.add(Role(name=role_name))
        db.commit()
    finally:
        db.close()


def create_app() -> FastAPI:
    app = FastAPI(title="Hedgehog CRM API")

    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    @app.on_event("startup")
    def on_startup() -> None:
        Base.metadata.create_all(bind=engine)
        _seed_roles()

    app.include_router(api_router)
    return app


app = create_app()
