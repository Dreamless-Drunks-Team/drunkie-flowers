#!/usr/bin/env python3
from datetime import datetime
import os
from flask import Flask, jsonify
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from observability.loggers.stdout_logger import StdoutLogger
from orm.db import db
from populate import populate_db
from observability.log import log

app = Flask(__name__)
CORS(app)

from auth.manager import auth

from api.orders import orders
from api.bouquets import bouquets
from api.user_profile import user_profile
from api.fileserver import fileserver

app.register_blueprint(orders, url_prefix="/orders")
app.register_blueprint(bouquets, url_prefix="/bouquets")
app.register_blueprint(user_profile, url_prefix="/user")
app.register_blueprint(fileserver, url_prefix="/files")

from orm.bouquet import *
from orm.event import *
from orm.decoration import *
from orm.order import *
from orm.order_item import *
from orm.delivery_option import *
from orm.user import *
from orm.card import *
from orm.flower import *


app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///data.db"
app.config["UPLOAD_FOLDER"] = app.static_folder
app.config["SQLALCHEMY_ECHO"] = True

app.config["JWT_SECRET_KEY"] = "super-secret"  # Change this!
app.config["JWT_BLACKLIST_ENABLED"] = True
app.config["JWT_BLACKLIST_TOKEN_CHECKS"] = ["access", "refresh"]

jwt = JWTManager(app)

logger = StdoutLogger()
log.set_logger(logger)

@jwt.token_in_blocklist_loader
def user_loader_callback(jwt_headers, jwt_payload):
    print(jwt_payload)

    identity = {
        "user_id": jwt_payload["sub"]["user_id"],
        "issued_at": datetime.strptime(jwt_payload["sub"]["issued_at"], "%a, %d %b %Y %H:%M:%S %Z"),
    }
    return not auth.validate_token(identity)


db.init_app(app)
app.app_context().push()

db.drop_all()
db.create_all()
populate_db()

if __name__ == "__main__":
    app.run(debug=True)
