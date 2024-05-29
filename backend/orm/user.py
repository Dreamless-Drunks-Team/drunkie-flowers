from dataclasses import dataclass
from sqlalchemy import ForeignKey
from sqlalchemy.orm import Mapped, mapped_column
from orm.db import db


@dataclass
class User(db.Model):
    __tablename__ = "user"
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column()
    email: Mapped[str] = mapped_column()
    password: Mapped[str] = mapped_column(deferred=True)
    phone: Mapped[str] = mapped_column(deferred=True)
    role_id: Mapped[int] = mapped_column(ForeignKey("role.id"))

    role: Mapped["Role"] = db.relationship()


@dataclass
class Role(db.Model):
    __tablename__ = "role"
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column()
