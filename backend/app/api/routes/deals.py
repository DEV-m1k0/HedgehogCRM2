from datetime import datetime

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.db import get_db
from app.models import Deal
from app.schemas import DealCreate, DealRead, DealUpdate

router = APIRouter()


@router.get("", response_model=list[DealRead])
def list_deals(db: Session = Depends(get_db)) -> list[Deal]:
    return db.query(Deal).filter(Deal.archived_at.is_(None)).order_by(Deal.updated_at.desc()).all()


@router.post("", response_model=DealRead, status_code=status.HTTP_201_CREATED)
def create_deal(payload: DealCreate, db: Session = Depends(get_db)) -> Deal:
    deal = Deal(**payload.model_dump())
    db.add(deal)
    db.commit()
    db.refresh(deal)
    return deal


@router.patch("/{deal_id}", response_model=DealRead)
def update_deal(deal_id: int, payload: DealUpdate, db: Session = Depends(get_db)) -> Deal:
    deal = db.get(Deal, deal_id)
    if not deal or deal.archived_at is not None:
        raise HTTPException(status_code=404, detail="Сделка не найдена")

    for key, value in payload.model_dump(exclude_unset=True).items():
        setattr(deal, key, value)

    db.commit()
    db.refresh(deal)
    return deal


@router.delete("/{deal_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_deal(deal_id: int, db: Session = Depends(get_db)) -> None:
    deal = db.get(Deal, deal_id)
    if not deal or deal.archived_at is not None:
        raise HTTPException(status_code=404, detail="Сделка не найдена")

    deal.archived_at = datetime.utcnow()
    db.commit()


@router.post("/{deal_id}/restore", response_model=DealRead)
def restore_deal(deal_id: int, db: Session = Depends(get_db)) -> Deal:
    deal = db.get(Deal, deal_id)
    if not deal:
        raise HTTPException(status_code=404, detail="Сделка не найдена")

    deal.archived_at = None
    db.commit()
    db.refresh(deal)
    return deal
