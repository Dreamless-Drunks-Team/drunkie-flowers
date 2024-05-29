from dataclasses import dataclass
from typing import List
from flask import Blueprint, json, jsonify, request
from flask_jwt_extended import get_jwt_identity, jwt_required
from orm.card import Card
from orm.order_item import OrderItem
from orm.user import User
from orm.db import db
from auth.manager import TokenPayload
from orm.order import Order, OrderStatus


orders = Blueprint("orders", __name__)


@orders.route("/create_order", methods=["POST"])
@jwt_required()
def create_order():
    user_id = TokenPayload(**get_jwt_identity()).user_id
    card = Card.query.filter_by(user_id=user_id).first()
    status = OrderStatus.CREATED

    delivery = request.json.get("delivery_id")

    if not delivery:
        return {"msg": "Delivery id is required"}, 400

    order = Order(user_id=user_id, card_id=card.id, status=status, delivery_id=delivery)
    db.session.add(order)
    db.session.commit()

    return {"msg": f"Order {order.id} created successfully"}, 201


@orders.route("/<int:id>")
@jwt_required()
def get_order(id: int):
    user_id = TokenPayload(**get_jwt_identity()).user_id
    order = Order.query.filter_by(user_id=user_id, id=id).first()
    return jsonify(order)


@orders.route("/<int:id>/items")
@jwt_required()
def get_order_items(id: int):
    user_id = TokenPayload(**get_jwt_identity()).user_id
    items = Order.query.filter_by(user_id=user_id).first().items
    return jsonify(items)


@orders.route("/<int:id>/items", methods=["POST"])
@jwt_required()
def add_order_item(id: int):
    req = request.json

    order = Order.query.get(id)

    if not order:
        return {"msg": f"Order {id} not found"}, 404

    user = order.user
    if user.id != TokenPayload(**get_jwt_identity()).user_id:
        return {"msg": "Unauthorized"}, 401

    order_item = OrderItem(order_id=id, **req)
    db.session.add(order_item)
    db.session.commit()

    return {"msg": f"Item {order_item.id} added to order successfully"}, 201


@orders.route("<int:id>/items/<int:item_id>", methods=["DELETE"])
@jwt_required()
def delete_order_item(id: int, item_id: int):
    order = Order.query.get(id)

    if not order:
        return {"msg": f"Order {id} not found"}, 404

    user = order.user
    if user.id != TokenPayload(**get_jwt_identity()).user_id:
        return {"msg": "Unauthorized"}, 401

    order_item = OrderItem.query.get(item_id)
    db.session.delete(order_item)
    db.session.commit()

    return {"msg": f"Item {item_id} deleted from order successfully"}, 200


@orders.route("<int:id>/items/<int:item_id>", methods=["PUT"])
@jwt_required()
def update_order_item(id: int, item_id: int):
    order = Order.query.get(id)

    if not order:
        return {"msg": f"Order {id} not found"}, 404

    user = order.user
    if user.id != TokenPayload(**get_jwt_identity()).user_id:
        return {"msg": "Unauthorized"}, 401

    req = request.json

    db.session.query(OrderItem).filter_by(id=item_id).update(req)
    db.session.commit()

    return {"msg": f"Item {item_id} updated successfully"}, 200


@orders.route("/<int:id>/place", methods=["POST"])
@jwt_required()
def place_order(id: int):
    order = Order.query.get(id)
    
    if not order:
        return {"msg": f"Order {id} not found"}, 404
    
    user = order.user
    if user.id != TokenPayload(**get_jwt_identity()).user_id:
        return {"msg": "Unauthorized"}, 401
    
    order = Order.query.get(id)
    order.status = "paid"
    db.session.commit()

    return {"msg": "Order placed successfully"}, 201
