from dataclasses import dataclass
import json
from typing import List
from flask import Blueprint, request
    
    
user_profile = Blueprint('user_profile', __name__)

@user_profile.route('/<int:id>')
def get_user_profile(id: int):
    # Retrieve and return user profile with id
    pass

@user_profile.route('/<int:id>', methods=['PUT'])
def update_user_profile(id: int):
    # Update user profile with id
    pass

@user_profile.route('/<int:id>', methods=['DELETE'])
def delete_user_profile(id: int):
    # Delete user profile with id
    pass

@user_profile.route('/login', methods=['POST'])
def login():
    # Login
    pass

@user_profile.route('/register', methods=['POST'])
def register():
    # Register
    pass



