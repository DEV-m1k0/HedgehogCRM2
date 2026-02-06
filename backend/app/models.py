from sqlalchemy import Boolean, String, ForeignKey, Float, DateTime
from sqlalchemy.orm import Mapped, mapped_column, relationship, DeclarativeBase

from datetime import datetime
import bcrypt

class Base(DeclarativeBase):
    pass

class Role(Base):
    __tablename__ = "roles"

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String, unique=True)

    users: Mapped[list["User"]] = relationship("User", back_populates="role")

    def __repr__(self):
        return f"Role(id={self.id!r}, name={self.name!r})"

class User(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(primary_key=True)
    email: Mapped[str] = mapped_column(String, unique=True)
    password: Mapped[str] = mapped_column(String)
    first_name: Mapped[str] = mapped_column(String)
    second_name: Mapped[str] = mapped_column(String)
    patronymic: Mapped[str] = mapped_column(String, nullable=True)
    income_per_hour: Mapped[float] = mapped_column(Float, default=0.0)
    role_id: Mapped[int] = mapped_column(ForeignKey("roles.id"))

    is_accepted: Mapped[bool] = mapped_column(Boolean, default=False)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.now())

    role: Mapped[Role] = relationship("Role", back_populates="users")

    def __init__(self, email, password, first_name, second_name, patronymic, income_per_hour, role, is_accepted, created_at):
        self.email = email
        self.password = self.__hash_password(password)
        self.first_name = first_name
        self.second_name = second_name
        self.patronymic = patronymic
        self.income_per_hour = income_per_hour
        self.role = role
        self.is_accepted = is_accepted
        self.created_at = created_at

    def __hash_password(self, password: str):
        return bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
    
    def check_password(self, password: str):
        return bcrypt.checkpw(password.encode('utf-8'), self.password.encode('utf-8'))

    def __repr__(self):
        return f"User(id={self.id!r}, email={self.email!r}, role={self.role!r})"