from dataclasses import dataclass
import json
from typing import List
from flask import Blueprint, request
    
    
orders = Blueprint('orders', __name__)

@orders.route('/create_order', methods=['POST'])
def create_order(user_id: int):
    # Create a new order
    pass

@orders.route('/<int:id>')
def get_order(id: int):
    # Retrieve and return order with id
    pass

@orders.route('/items')
def get_order_items():
    # Retrieve and return list of ordered items
    pass

@orders.route('/items/<int:id>')
def get_order_item(id: int):
    # Retrieve and return ordered item with id
    pass

@orders.route('/items', methods=['POST'])
def add_order_item():
    # Add a new ordered item
    pass

@orders.route('/items/<int:id>', methods=['DELETE'])
def delete_order_item(id: int):
    
    # Delete ordered item with id
    pass

@orders.route('/items/<int:id>', methods=['PUT'])
def update_order_item(id: int):
    # Update ordered item with id
    pass

@orders.route('/<int:id>/place', methods=['POST'])
def place_order(id: int):
    # Place order with id
    pass


