from dataclasses import dataclass
from sqlalchemy import ForeignKey
from sqlalchemy.orm import Mapped, mapped_column
from orm.db import db

@dataclass
class Bouquet(db.Model):
    __tablename__ = "bouquet"
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column()
    description: Mapped[str] = mapped_column()
    thumbnail_url: Mapped[str] = mapped_column()

    suitable_events: Mapped[list["Event"]] = db.relationship(
        "Event", secondary="bouquet_event_association"
    )
    decorations: Mapped[list["Decoration"]] = db.relationship(
        "Decoration", secondary="bouquet_decoration_association"
    )
    delivery_options: Mapped[list["DeliveryOption"]] = db.relationship(
        "DeliveryOption", secondary="bouquet_delivery_option_association"
    )
    flowers: Mapped[list["Flower"]] = db.relationship(
        "Flower", secondary="bouquet_item"
    )


class BouquetEventAssociation(db.Model):
    __tablename__ = "bouquet_event_association"
    bouquet_id: Mapped[int] = mapped_column(ForeignKey("bouquet.id"), primary_key=True)
    event_id: Mapped[int] = mapped_column(ForeignKey("event.id"), primary_key=True)


class BouquetDecorationAssociation(db.Model):
    __tablename__ = "bouquet_decoration_association"
    bouquet_id: Mapped[int] = mapped_column(ForeignKey("bouquet.id"), primary_key=True)
    decoration_id: Mapped[int] = mapped_column(
        ForeignKey("decoration.id"), primary_key=True
    )


class BouquetDeliveryOptionAssociation(db.Model):
    __tablename__ = "bouquet_delivery_option_association"
    bouquet_id: Mapped[int] = mapped_column(ForeignKey("bouquet.id"), primary_key=True)
    delivery_option_id: Mapped[int] = mapped_column(
        ForeignKey("delivery_option.id"), primary_key=True
    )

@dataclass
class BouquetItem(db.Model):
    __tablename__ = "bouquet_item"
    bouquet_id: Mapped[int] = mapped_column(ForeignKey("bouquet.id"), primary_key=True)
    flower_id: Mapped[int] = mapped_column(ForeignKey("flower.id"), primary_key=True)
    quantity: Mapped[int] = mapped_column()

    bouquet: Mapped["Bouquet"] = db.relationship()
    flower: Mapped["Flower"] = db.relationship()
