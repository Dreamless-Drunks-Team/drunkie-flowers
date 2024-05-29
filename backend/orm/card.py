from dataclasses import dataclass
from sqlalchemy import ForeignKey
from sqlalchemy.orm import Mapped, mapped_column
from orm.price_policy_entity import PricePolicyEntity
from orm.db import db


@dataclass
class Card(db.Model):
    __tablename__ = "card"
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column()
    user_id: Mapped[int] = mapped_column(ForeignKey("user.id"))
    type_id: Mapped[int] = mapped_column(ForeignKey("card_type.id"))
    
    user: Mapped["User"] = db.relationship()
    type: Mapped["CardType"] = db.relationship()

@dataclass
class CardType(PricePolicyEntity):
    __tablename__ = "card_type"
    id: Mapped[int] = mapped_column(ForeignKey("price_policy_entity.id"), primary_key=True)

    __mapper_args__ = {
        'polymorphic_identity': 'card_type',
    }
