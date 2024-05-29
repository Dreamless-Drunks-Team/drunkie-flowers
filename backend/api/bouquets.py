from dataclasses import dataclass
import json
from typing import List
from flask import Blueprint, jsonify, request
from flask_jwt_extended import get_jwt_identity, jwt_required
from auth.manager import TokenPayload
from orm.user import User
from orm.decoration import Decoration
from orm.delivery_option import DeliveryOption
from orm.flower import Flower
from orm.event import Event
from orm.bouquet import Bouquet
from orm.db import db


bouquets = Blueprint("bouquets", __name__)


@bouquets.route("/")
def get_items():
    return jsonify([x.shallow_serialize() for x in Bouquet.query.all()])


@bouquets.route("/<int:id>")
def get_item(id: int):
    return jsonify(Bouquet.query.get(id))


@bouquets.route("/", methods=["POST"])
@jwt_required()
def add_item():
    jwt_payload = TokenPayload(**get_jwt_identity())

    role = User.query.get(jwt_payload.user_id).role
    if role.name not in ["admin", "merchant"]:
        return jsonify({"msg": "Unauthorized"}), 401

    data = request.json
    bouquet = Bouquet(**data)
    db.session.add(bouquet)
    db.session.commit()
    return jsonify(bouquet)


@bouquets.route("/<int:id>", methods=["DELETE"])
@jwt_required()
def delete_item(id: int):
    jwt_payload = TokenPayload(**get_jwt_identity())

    role = User.query.get(jwt_payload.user_id).role
    if role.name not in ["admin", "merchant"]:
        return jsonify({"msg": "Unauthorized"}), 401

    bouquet = Bouquet.query.get(id)
    db.session.delete(bouquet)
    db.session.commit()
    return jsonify(bouquet)


@bouquets.route("/events", methods=["GET"])
def get_events():
    return jsonify([x.shallow_serialize() for x in Event.query.all()])


@bouquets.route("/decorations", methods=["GET"])
def get_decorations():
    return jsonify([x.shallow_serialize() for x in Decoration.query.all()])


@bouquets.route("/flowers", methods=["GET"])
def get_flowers():
    return jsonify([x.shallow_serialize(["price"]) for x in Flower.query.all()])


@bouquets.route("/delivery_options", methods=["GET"])
def get_delivery_options():
    return jsonify([x.shallow_serialize() for x in DeliveryOption.query.all()])
