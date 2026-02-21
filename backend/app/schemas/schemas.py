from __future__ import annotations

from datetime import date, datetime

from pydantic import BaseModel, ConfigDict, Field


class ORMBase(BaseModel):
    model_config = ConfigDict(from_attributes=True)


class MessageOut(BaseModel):
    message: str


class RoleRead(ORMBase):
    id: int
    name: str


class UserRead(ORMBase):
    id: int
    email: str
    first_name: str
    second_name: str
    patronymic: str | None
    income_per_hour: float
    phone: str | None
    is_accepted: bool
    created_at: datetime
    role: RoleRead


class RegisterIn(BaseModel):
    email: str
    password: str = Field(min_length=6, max_length=255)
    first_name: str = Field(min_length=1, max_length=100)
    second_name: str = Field(min_length=1, max_length=100)
    patronymic: str | None = None


class LoginIn(BaseModel):
    email: str
    password: str


class LoginOut(BaseModel):
    user: UserRead


class ClientCreate(BaseModel):
    first_name: str
    second_name: str
    patronymic: str | None = None
    date_of_birth: date | None = None
    parent_full_name: str | None = None
    parent_phone: str | None = None
    parent_email: str | None = None
    tags: str | None = None


class ClientRead(ORMBase):
    id: int
    first_name: str
    second_name: str
    patronymic: str | None
    date_of_birth: date | None
    parent_full_name: str | None
    parent_phone: str | None
    parent_email: str | None
    tags: str | None
    created_at: datetime


class CourseCreate(BaseModel):
    name: str
    cost: float = 0.0
    lesson_cost: float = 0.0
    lesson_count: int = 0
    module_count: int = 2


class CourseRead(ORMBase):
    id: int
    name: str
    cost: float
    lesson_cost: float
    lesson_count: int
    module_count: int


class GroupCreate(BaseModel):
    name: str
    course_id: int
    teacher_id: int | None = None
    schedule_text: str | None = None
    audience: str | None = None


class GroupAddStudent(BaseModel):
    client_id: int


class GroupRead(ORMBase):
    id: int
    name: str
    course_id: int
    teacher_id: int | None
    schedule_text: str | None
    audience: str | None


class LessonCreate(BaseModel):
    group_id: int
    topic: str
    start_at: datetime
    end_at: datetime
    materials_url: str | None = None
    comment: str | None = None


class LessonRead(ORMBase):
    id: int
    group_id: int
    topic: str
    start_at: datetime
    end_at: datetime
    materials_url: str | None
    comment: str | None
    is_conducted: bool


class AttendanceUpsert(BaseModel):
    client_id: int
    status: str = Field(pattern="^(present|absent|late)$")
    comment: str | None = None


class AttendanceRead(ORMBase):
    id: int
    lesson_id: int
    client_id: int
    status: str
    comment: str | None


class DealCreate(BaseModel):
    client_id: int
    manager_id: int | None = None
    stage: str = "Первичный контакт"
    amount: float = 0.0
    deadline: datetime | None = None
    status: str = "active"


class DealUpdate(BaseModel):
    stage: str | None = None
    amount: float | None = None
    deadline: datetime | None = None
    status: str | None = None


class DealRead(ORMBase):
    id: int
    client_id: int
    manager_id: int | None
    stage: str
    amount: float
    deadline: datetime | None
    status: str
    created_at: datetime
    updated_at: datetime


class TaskCreate(BaseModel):
    title: str
    description: str | None = None
    assignee_id: int | None = None
    creator_id: int | None = None
    client_id: int | None = None
    deal_id: int | None = None
    priority: str = Field(default="medium", pattern="^(low|medium|high)$")
    deadline: datetime | None = None


class TaskUpdate(BaseModel):
    title: str | None = None
    description: str | None = None
    assignee_id: int | None = None
    priority: str | None = Field(default=None, pattern="^(low|medium|high)$")
    deadline: datetime | None = None
    status: str | None = Field(default=None, pattern="^(open|in_progress|done)$")


class TaskRead(ORMBase):
    id: int
    title: str
    description: str | None
    assignee_id: int | None
    creator_id: int | None
    client_id: int | None
    deal_id: int | None
    priority: str
    deadline: datetime | None
    status: str
    created_at: datetime
