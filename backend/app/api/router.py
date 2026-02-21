from fastapi import APIRouter

from .routes import auth, clients, courses, deals, groups, meta, schedule, tasks

api_router = APIRouter()
api_router.include_router(meta.router, tags=["meta"])
api_router.include_router(auth.router, prefix="/auth", tags=["auth"])
api_router.include_router(clients.router, prefix="/clients", tags=["clients"])
api_router.include_router(courses.router, prefix="/courses", tags=["courses"])
api_router.include_router(groups.router, prefix="/groups", tags=["groups"])
api_router.include_router(schedule.router, prefix="/schedule", tags=["schedule"])
api_router.include_router(deals.router, prefix="/deals", tags=["deals"])
api_router.include_router(tasks.router, prefix="/tasks", tags=["tasks"])
