from dataclasses import dataclass
import email
import json
from orm.user import Role, User
from orm.db import db
from typing import List
from flask import Blueprint, jsonify, request
from auth.manager import TokenPayload, auth
from events.events import on_login, on_account_change

from flask_jwt_extended import (
    jwt_required,
    get_jwt_identity,
    create_access_token,
    create_refresh_token,
)


user_profile = Blueprint("user_profile", __name__)


@user_profile.route("/")
@jwt_required()
def get_user_profile():
    id = TokenPayload(**get_jwt_identity()).user_id
    return jsonify(User.query.get(id))


@user_profile.route("/", methods=["PUT"])
@jwt_required()
def update_user_profile():
    id = TokenPayload(**get_jwt_identity()).user_id

    password = request.json.get("password", None)

    query = User.query.filter_by(id=id)
    user = query.first()

    if password != user.password:
        return jsonify({"msg": "Unauthorized"}), 401

    query.update(request.json)
    db.session.commit()
    
    on_account_change.notify(user)
    return jsonify(User.query.get(id))


@user_profile.route("/", methods=["DELETE"])
@jwt_required()
def delete_user_profile():
    id = TokenPayload(**get_jwt_identity()).user_id

    password = request.json.get("password", None)

    query = User.query.filter_by(id=id)
    user = query.first()

    if password != user.password:
        return jsonify({"msg": "Unauthorized"}), 401

    user = User.query.get(id)
    db.session.delete(user)
    db.session.commit()
    return jsonify(user)


@user_profile.route("/login", methods=["POST"])
def login():
    email = request.json.get("email", None)
    password = request.json.get("password", None)

    if not email or not password:
        return jsonify({"msg": "Missing required fields"}), 400

    user = auth.authenticate(email, password)

    if not user:
        return jsonify({"msg": "Bad username or password"}), 401

    ret = {
        "access_token": create_access_token(auth.issue_token(user).to_dict()),
        "refresh_token": create_refresh_token(auth.issue_token(user).to_dict()),
    }
    
    on_login.notify(user)
    return jsonify(ret), 200


@user_profile.route("/refresh", methods=["POST"])
@jwt_required(refresh=True)
def refresh():
    current_token = TokenPayload(**get_jwt_identity())
    ret = {
        "access_token": create_access_token(current_token),
    }
    
    return jsonify(ret), 200


@user_profile.route("/register", methods=["POST"])
def register():
    name = request.json.get("name", None)
    email = request.json.get("email", None)
    phone = request.json.get("phone", None)
    password = request.json.get("password", None)

    if not name or not email or not phone or not password:
        return jsonify({"msg": "Missing required fields"}), 400

    default_role = Role.query.filter_by(name="user").first()

    db.session.add(
        User(name=name, email=email, phone=phone, password=password, role=default_role)
    )
    db.session.commit()

    return jsonify({"msg": "User registered successfully"}), 201
