# import sys, os

# sys.path.append(os.path.join(os.path.dirname(__file__), '..'))

from datetime import datetime
from sqlalchemy import create_engine
from sqlalchemy.orm import Session

from app.models import Base, Role, User

from database import engine, SessionLocal

Base.metadata.create_all(engine)

session = SessionLocal()

def create_roles():
    """Создание ролей если они не существуют"""
    roles_data = [
        {"name": "администратор"},
        {"name": "менеджер"},
        {"name": "преподаватель"},
        {"name": "аноним"}
    ]
    
    for role_data in roles_data:
        # Проверяем, существует ли уже такая роль
        existing_role = session.query(Role).filter_by(name=role_data["name"]).first()
        if not existing_role:
            role = Role(name=role_data["name"])
            session.add(role)
            print(f"Создана роль: {role_data['name']}")
        else:
            print(f"Роль '{role_data['name']}' уже существует")
    
    session.commit()
    print("Все роли созданы/проверены")

def create_users():
    """Создание пользователей с соответствующими ролями"""
    
    # Получаем роли из базы данных
    roles = {}
    role_names = ["администратор", "менеджер", "преподаватель", "аноним"]
    
    for role_name in role_names:
        role = session.query(Role).filter_by(name=role_name).first()
        if role:
            roles[role_name] = role
        else:
            print(f"Ошибка: роль '{role_name}' не найдена")
            return
    
    # Данные для пользователей
    users_data = [
        {
            "email": "admin@example.com",
            "password": "admin",  # В реальном приложении используйте сложные пароли!
            "first_name": "Иван",
            "second_name": "Иванов",
            "patronymic": "Иванович",
            "income_per_hour": 1000.0,
            "role_name": "администратор",
            "is_accepted": True
        },
        {
            "email": "manager@example.com",
            "password": "manager",
            "first_name": "Петр",
            "second_name": "Петров",
            "patronymic": "Петрович",
            "income_per_hour": 500.0,
            "role_name": "менеджер",
            "is_accepted": True
        },
        {
            "email": "teacher@example.com",
            "password": "teacher",
            "first_name": "Анна",
            "second_name": "Сидорова",
            "patronymic": "Алексеевна",
            "income_per_hour": 300.0,
            "role_name": "преподаватель",
            "is_accepted": True
        },
        {
            "email": "anonymous@example.com",
            "password": "anonymous",
            "first_name": "Аноним",
            "second_name": "Анонимов",
            "patronymic": None,
            "income_per_hour": 0.0,
            "role_name": "аноним",
            "is_accepted": False
        }
    ]
    
    for user_data in users_data:
        # Проверяем, существует ли уже пользователь с таким email
        existing_user = session.query(User).filter_by(email=user_data["email"]).first()
        if not existing_user:
            # Создаем пользователя с помощью конструктора
            user = User(
                email=user_data["email"],
                password=user_data["password"],  # Пароль будет захеширован в конструкторе
                first_name=user_data["first_name"],
                second_name=user_data["second_name"],
                patronymic=user_data["patronymic"],
                income_per_hour=user_data["income_per_hour"],
                role=roles[user_data["role_name"]],
                is_accepted=user_data["is_accepted"],
                created_at=datetime.now()
            )
            session.add(user)
            print(f"Создан пользователь: {user_data['email']} ({user_data['role_name']})")
        else:
            print(f"Пользователь '{user_data['email']}' уже существует")
    
    session.commit()
    print("Все пользователи созданы/проверены")

def main():
    """Основная функция инициализации"""
    try:
        print("Начало инициализации базы данных...")
        
        # Создаем роли
        create_roles()
        
        # Создаем пользователей
        create_users()
        
        print("Инициализация завершена успешно!")
        
        # Выводим информацию о созданных пользователях
        print("\nСозданные пользователи:")
        users = session.query(User).all()
        for user in users:
            print(f"- {user.email} (Роль: {user.role.name})")
            
    except Exception as e:
        print(f"Произошла ошибка: {e}")
        session.rollback()
    finally:
        session.close()

if __name__ == "__main__":
    main()