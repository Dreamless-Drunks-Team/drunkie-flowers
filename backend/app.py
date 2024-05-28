#!/usr/bin/env python3
from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


from api.orders import orders
from api.bouquets import bouquets
from api.user_profile import user_profile

app.register_blueprint(orders, url_prefix='/orders')
app.register_blueprint(bouquets, url_prefix='/bouquets')
app.register_blueprint(user_profile, url_prefix='/user')

if __name__ == '__main__':
    app.run(debug=True)