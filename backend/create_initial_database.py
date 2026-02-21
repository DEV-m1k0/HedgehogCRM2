from app.db import SessionLocal, engine
from app.models import Base, Role, User

DEFAULT_USERS = [
    {
        "email": "admin@example.com",
        "password": "admin123",
        "first_name": "Иван",
        "second_name": "Иванов",
        "patronymic": "Иванович",
        "role": "администратор",
        "is_accepted": True,
        "income_per_hour": 1000.0,
    },
    {
        "email": "manager@example.com",
        "password": "manager123",
        "first_name": "Петр",
        "second_name": "Петров",
        "patronymic": "Петрович",
        "role": "менеджер",
        "is_accepted": True,
        "income_per_hour": 500.0,
    },
    {
        "email": "teacher@example.com",
        "password": "teacher123",
        "first_name": "Анна",
        "second_name": "Сидорова",
        "patronymic": "Алексеевна",
        "role": "преподаватель",
        "is_accepted": True,
        "income_per_hour": 300.0,
    },
]


def main() -> None:
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()

    try:
        roles = {}
        for name in ["администратор", "менеджер", "преподаватель", "аноним"]:
            role = db.query(Role).filter(Role.name == name).first()
            if not role:
                role = Role(name=name)
                db.add(role)
                db.flush()
            roles[name] = role

        for row in DEFAULT_USERS:
            exists = db.query(User).filter(User.email == row["email"]).first()
            if exists:
                continue

            user = User(
                email=row["email"],
                first_name=row["first_name"],
                second_name=row["second_name"],
                patronymic=row["patronymic"],
                role_id=roles[row["role"]].id,
                is_accepted=row["is_accepted"],
                income_per_hour=row["income_per_hour"],
            )
            user.set_password(row["password"])
            db.add(user)

        db.commit()
        print("Database initialized")
    except Exception:
        db.rollback()
        raise
    finally:
        db.close()


if __name__ == "__main__":
    main()
