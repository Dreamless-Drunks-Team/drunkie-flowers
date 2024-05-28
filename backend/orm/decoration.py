from dataclasses import dataclass
from sqlalchemy import ForeignKey
from sqlalchemy.orm import Mapped, mapped_column
from orm.price_policy_entity import PricePolicyEntity


@dataclass
class Decoration(PricePolicyEntity):
    __tablename__ = "decoration"
    id: Mapped[int] = mapped_column(ForeignKey("price_policy_entity.id"), primary_key=True)
    description: Mapped[str] = mapped_column()

    __mapper_args__ = {
        'polymorphic_identity': 'decoration',
    }
