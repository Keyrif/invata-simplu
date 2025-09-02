import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from datetime import datetime
from dotenv import load_dotenv
load_dotenv()
app = Flask(__name__)
CORS(app)

try:
    mongo_uri = os.environ.get('MONGO_URI')
    if not mongo_uri:
        raise ValueError("MongoDB key environment variable not set.")
        
    client = MongoClient(mongo_uri)
    db = client.buyfromromania
    users_collection = db.users
    print("Connected to MongoDB successfully!")
except Exception as e:
    print(f"Error connecting to MongoDB: {e}")
    exit(1)


@app.route('/api/user', methods=['POST'])
def handle_user_actions():
    """
    Handles all user-related actions (register, login, buyPremium, changePassword)
    from a single POST endpoint.
    """
    try:
        data = request.get_json()
        action = data.get('action')
        username = data.get('username')
        password = data.get('password')
        

        if not all([action, username]):
            return jsonify({"message": "Invalid request. Missing action or username."}), 400

        normalized_username = username.lower()

        if action == 'register':
            return register_user(normalized_username, password)
        elif action == 'login':
            return login_user(normalized_username, password)
        elif action == 'buyPremium':
            return buy_premium(normalized_username)
        elif action == 'changePassword':
            current_password = data.get('currentPassword')
            new_password = data.get('newPassword')
            return change_password(normalized_username, current_password, new_password)
        else:
            return jsonify({"message": "Invalid action specified."}), 400

    except Exception as e:
        print(f"Server error: {e}")
        return jsonify({"message": "Internal server error."}), 500

def register_user(username, password):
    """Handles user registration."""
    existing_user = users_collection.find_one({'username': username})
    if existing_user:
        return jsonify({"message": "User with this username already exists."}), 409

    new_user = {
        "username": username,
        "password": password,
        "createdAt": datetime.now(),
        "hasPremium": False
    }
    
    users_collection.insert_one(new_user)
    return jsonify({"message": "User registered successfully!"}), 201

def login_user(username, password):
    """Handles user login."""
    user = users_collection.find_one({'username': username})
    if not user or user['password'] != password:
        return jsonify({"message": "Invalid credentials. User not found or incorrect password."}), 401

    return jsonify({
        "message": "Login successful!",
        "username": user['username'],
        "hasPremium": user['hasPremium']
    }), 200

def buy_premium(username):
    """Handles the purchase of a premium subscription."""
    user = users_collection.find_one({'username': username})
    if not user:
        return jsonify({"message": "User not found."}), 404

    users_collection.update_one(
        {"username": user['username']},
        {"$set": {"hasPremium": True}}
    )
    return jsonify({"message": "Premium activated successfully!", "hasPremium": True}), 200

def change_password(username, current_password, new_password):
    """Handles password changes."""
    user = users_collection.find_one({'username': username})
    
    if not user or user['password'] != current_password:
        return jsonify({"message": "Parolă curentă incorectă."}), 401

    if current_password == new_password:
        return jsonify({"message": "Noua parolă nu poate fi aceeași cu parola curentă."}), 400
    
    users_collection.update_one(
        {"username": user['username']},
        {"$set": {"password": new_password}}
    )

    return jsonify({"message": "Parolă schimbată cu succes!"}), 200

if __name__ == '__main__':
    app.run(port=5000, debug=True)
