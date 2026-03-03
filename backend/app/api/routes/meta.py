from pathlib import Path
from uuid import uuid4

from fastapi import APIRouter, Depends, File, HTTPException, UploadFile, status
from sqlalchemy.orm import Session

from app.api.deps import get_current_user
from app.db import get_db
from app.models import Role, User
from app.schemas import MessageOut, RoleRead, UserRead, UserSelfUpdate
from app.services.email_service import notifications_enabled, send_plain_email, smtp_is_configured

router = APIRouter()
AVATAR_DIR = Path(__file__).resolve().parents[3] / "media" / "avatars"
MAX_AVATAR_SIZE_BYTES = 5 * 1024 * 1024
ALLOWED_CONTENT_TYPES = {
    "image/jpeg": ".jpg",
    "image/png": ".png",
    "image/webp": ".webp",
}


@router.get("/health", response_model=MessageOut)
def healthcheck() -> MessageOut:
    return MessageOut(message="ok")


@router.get("/roles", response_model=list[RoleRead])
def list_roles(db: Session = Depends(get_db)) -> list[Role]:
    return db.query(Role).order_by(Role.id).all()


@router.get("/users", response_model=list[UserRead])
def list_users(db: Session = Depends(get_db)) -> list[User]:
    return db.query(User).order_by(User.id).all()


@router.get("/users/me", response_model=UserRead)
def get_me(current_user: User = Depends(get_current_user)) -> User:
    return current_user


@router.patch("/users/me", response_model=UserRead)
def update_me(
    payload: UserSelfUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> User:
    if payload.email is not None:
        existing = (
            db.query(User)
            .filter(User.email == payload.email, User.id != current_user.id)
            .first()
        )
        if existing:
            raise HTTPException(status_code=409, detail="Пользователь с таким email уже существует")
        current_user.email = payload.email
    if payload.first_name is not None:
        current_user.first_name = payload.first_name.strip()
    if payload.second_name is not None:
        current_user.second_name = payload.second_name.strip()
    if payload.patronymic is not None:
        current_user.patronymic = payload.patronymic.strip() or None
    current_user.phone = payload.phone.strip() if payload.phone else None
    current_user.vk_contact = payload.vk_contact.strip() if payload.vk_contact else None
    current_user.telegram_contact = payload.telegram_contact.strip() if payload.telegram_contact else None
    current_user.whatsapp_contact = payload.whatsapp_contact.strip() if payload.whatsapp_contact else None
    current_user.max_contact = payload.max_contact.strip() if payload.max_contact else None
    db.add(current_user)
    db.commit()
    db.refresh(current_user)
    return current_user


@router.post("/users/me/avatar", response_model=UserRead)
async def upload_my_avatar(
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> User:
    if file.content_type not in ALLOWED_CONTENT_TYPES:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Допустимы только JPG, PNG или WEBP",
        )

    payload = await file.read()
    if not payload:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Файл пустой")
    if len(payload) > MAX_AVATAR_SIZE_BYTES:
        raise HTTPException(
            status_code=status.HTTP_413_REQUEST_ENTITY_TOO_LARGE,
            detail="Размер файла не должен превышать 5 МБ",
        )

    AVATAR_DIR.mkdir(parents=True, exist_ok=True)
    extension = ALLOWED_CONTENT_TYPES[file.content_type]
    filename = f"user_{current_user.id}_{uuid4().hex}{extension}"
    target_path = AVATAR_DIR / filename
    target_path.write_bytes(payload)

    if current_user.avatar_url and current_user.avatar_url.startswith("/media/avatars/"):
        old_avatar = Path(__file__).resolve().parents[3] / current_user.avatar_url.lstrip("/")
        if old_avatar.exists():
            old_avatar.unlink(missing_ok=True)

    current_user.avatar_url = f"/media/avatars/{filename}"
    db.add(current_user)
    db.commit()
    db.refresh(current_user)
    return current_user


@router.post("/users/me/test-email", response_model=MessageOut)
def send_my_test_email(
    current_user: User = Depends(get_current_user),
) -> MessageOut:
    if not notifications_enabled():
        raise HTTPException(status_code=409, detail="Отправка email-уведомлений отключена")
    if not current_user.email:
        raise HTTPException(status_code=400, detail="У пользователя не указан email")
    if not smtp_is_configured():
        raise HTTPException(status_code=503, detail="SMTP не настроен на сервере")
    try:
        send_plain_email(
            to_email=current_user.email,
            subject="Тестовое письмо Hedgehog CRM",
            body=(
                "Это тестовое письмо для проверки email-уведомлений.\n\n"
                "Если вы получили это письмо, SMTP и отправка уведомлений работают корректно."
            ),
        )
    except Exception as exc:
        raise HTTPException(status_code=500, detail="Не удалось отправить тестовое письмо") from exc
    return MessageOut(message="Тестовое письмо отправлено")
