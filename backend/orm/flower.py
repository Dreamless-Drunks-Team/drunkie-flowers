from dataclasses import dataclass
from sqlalchemy.orm import Mapped, mapped_column
from orm.db import db

@dataclass
class Flower(db.Model):
    __tablename__ = "flower"
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column()
    description: Mapped[str] = mapped_column()
    thumbnail_url: Mapped[str] = mapped_column()
    price: Mapped[float] = mapped_column()