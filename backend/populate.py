from email import policy
from math import e
from sqlalchemy import desc
from orm.price_policy_entity import PolicyType
from orm.db import db
from orm.user import Role, User
from orm.card import Card, CardType
from orm.flower import Flower
from orm.bouquet import Bouquet, BouquetItem
from orm.event import Event
from orm.order import Order
from orm.order_item import OrderItem
from orm.decoration import Decoration
from orm.delivery_option import DeliveryOption


def populate_db():
    # Create a new session
    session = db.session()

    role_admin = Role(name="admin")
    role_user = Role(name="user")
    role_merchant = Role(name="merchant")

    user_john = User(
        name="John Doe",
        email="example@gmail.com",
        phone="1234567890",
        password="qwerty12345",
        role=role_admin,
    )
    user_jane = User(
        name="Jane Doe",
        email="example2@gmail.com",
        phone="1234567890",
        password="qwerty12345",
        role=role_user,
    )

    policy_type_standard = PolicyType(name="Standard", priority=1)
    policy_type_premium = PolicyType(name="Premium", priority=4)
    policy_type_extra_service = PolicyType(name="Additional Cost", priority=2)
    policy_type_cumulative_price = PolicyType(name="Cumulative Price", priority=3)

    card_type_standard = CardType(
        name="Standard",
        policy_type=policy_type_standard,
        policy_details={},
    )
    card_type_premium = CardType(
        name="Premium",
        policy_type=policy_type_premium,
        policy_details={"discount": 0.2},
    )

    card_john = Card(name="John Doe's card", user=user_john, type=card_type_standard)
    card_jane = Card(name="Jane Doe's card", user=user_jane, type=card_type_premium)

    flower_rose = Flower(
        name="Rose",
        description="Red rose",
        thumbnail_url="https://www.google.com",
        price=10.0,
    )
    flower_lily = Flower(
        name="Lily",
        description="White lily",
        thumbnail_url="https://www.google.com",
        price=20.0,
    )
    flower_tulip = Flower(
        name="Tulip",
        description="Yellow tulip",
        thumbnail_url="https://www.google.com",
        price=30.0,
    )

    event_birthday = Event(
        name="Birthday",
        description="Birthday event",
    )

    event_wedding = Event(
        name="Wedding",
        description="Wedding event",
    )

    event_burial = Event(
        name="Burial",
        description="Burial event",
    )

    decoration_strip = Decoration(
        name="Strip",
        description="A strip decoration",
        policy_type=policy_type_extra_service,
        policy_details={"price": 5.0},
    )

    decoration_cover = Decoration(
        name="Cover",
        description="A cover decoration",
        policy_type=policy_type_extra_service,
        policy_details={"price": 2.0},
    )

    decoration_transparent_cover = Decoration(
        name="Transparent Cover",
        description="A transparent cover decoration",
        policy_type=policy_type_extra_service,
        policy_details={"price": 3.0},
    )

    delivery_option_nova_poshta = DeliveryOption(
        name="Nova Poshta",
        description="Nova Poshta delivery service",
        policy_type=policy_type_extra_service,
        policy_details={"price": 10.0},
    )

    delivery_option_ukr_poshta = DeliveryOption(
        name="Ukr Poshta",
        description="Ukr Poshta delivery service",
        policy_type=policy_type_extra_service,
        policy_details={"price": 7.5},
    )

    bouquet_roses = Bouquet(
        name="Rose Bouquet",
        description="A bouquet of red roses",
        thumbnail_url="https://www.google.com",
        suitable_events=[event_birthday, event_wedding],
        decorations=[decoration_strip, decoration_transparent_cover],
        delivery_options=[delivery_option_nova_poshta],
        policy_type=policy_type_cumulative_price,
        policy_details={"discount_percent": 0.05},
    )
    bouquet_roses_item_1 = BouquetItem(
        quantity=10, flower=flower_rose, bouquet=bouquet_roses
    )
    bouquet_roses_item_2 = BouquetItem(
        quantity=5, flower=flower_lily, bouquet=bouquet_roses
    )

    bouquet_tulips = Bouquet(
        name="Tulip Bouquet",
        description="A bouquet of yellow tulips",
        thumbnail_url="https://www.google.com",
        suitable_events=[event_burial],
        decorations=[decoration_strip, decoration_cover],
        delivery_options=[delivery_option_ukr_poshta],
        policy_type=policy_type_cumulative_price,
        policy_details={"discount_percent": 0.05},
    )
    bouquet_tulips_item = BouquetItem(
        quantity=10,
        flower=flower_tulip,
        bouquet=bouquet_tulips,
    )

    order_john = Order(
        user=user_john,
        card=card_john,
        status="CREATED",
        delivery=delivery_option_nova_poshta,
    )
    order_item_john = OrderItem(
        order=order_john,
        bouquet=bouquet_roses,
        price=100.0,
        event=event_birthday,
        packaging=decoration_transparent_cover,
    )

    # Roles
    session.add(role_admin)
    session.add(role_user)
    session.add(role_merchant)

    # Users
    session.add(user_john)
    session.add(user_jane)

    # Policy types
    session.add(policy_type_standard)
    session.add(policy_type_premium)
    session.add(policy_type_extra_service)
    session.add(policy_type_cumulative_price)

    # Card types
    session.add(card_type_standard)
    session.add(card_type_premium)

    # Cards
    session.add(card_john)
    session.add(card_jane)

    # Flowers
    session.add(flower_rose)
    session.add(flower_lily)
    session.add(flower_tulip)

    # Events
    session.add(event_birthday)
    session.add(event_wedding)
    session.add(event_burial)

    # Decorations
    session.add(decoration_strip)
    session.add(decoration_cover)

    # Delivery options
    session.add(delivery_option_nova_poshta)
    session.add(delivery_option_ukr_poshta)

    # Bouquets
    session.add(bouquet_roses)
    session.add(bouquet_roses_item_1)
    session.add(bouquet_roses_item_2)

    session.add(bouquet_tulips)
    session.add(bouquet_tulips_item)
    
    # Orders
    session.add(order_john)
    session.add(order_item_john)

    # Commit the transaction
    session.commit()


if __name__ == "__main__":
    populate_db()
