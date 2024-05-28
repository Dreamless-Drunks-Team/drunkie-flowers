from dataclasses import dataclass
from sqlalchemy.orm import Mapped, mapped_column
from orm.db import db

@dataclass
class Event(db.Model):
    __tablename__ = "event"
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column()
    description: Mapped[str] = mapped_column()

    __mapper_args__ = {
        'polymorphic_identity': 'event',
    }