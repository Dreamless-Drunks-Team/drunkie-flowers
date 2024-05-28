from dataclasses import dataclass
from typing import Any
from sqlalchemy import JSON, Column, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column
from orm.db import db


@dataclass
class PricePolicyEntity(db.Model):
    __tablename__ = "price_policy_entity"
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(default="")
    entity_type: Mapped[str] = mapped_column()
    policy_type_id: Mapped[int] = mapped_column(ForeignKey("policy_type.id"))
    policy_details = Column(JSON, nullable=False)

    policy_type: Mapped["PolicyType"] = db.relationship( backref="price_policy_entity")
    
    __mapper_args__ = {
        'polymorphic_identity': 'price_policy_entity',
        'polymorphic_on': 'entity_type'
    }

@dataclass
class PolicyType(db.Model):
    __tablename__ = "policy_type"
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column()
    priority: Mapped[int] = mapped_column()
