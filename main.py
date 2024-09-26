from flask import request, jsonify
from config import app, db
from models import User


# Read function
@app.route("/users", methods=["GET"])
def get_users():
    users = User.query.all()
    json_users = list(map(lambda x: x.to_json(), users))
    return jsonify({"users": json_users})

# Create function
@app.route("/create_user", methods=["POST"])
def create_user():
    data = request.json
    first_name = data.get("firstName")
    last_name = data.get("lastName")
    address = data.get("address")
    role = data.get("role")
    number = data.get("number")
    birthday = data.get("birthday")

    if not first_name or not last_name or not address or not  role or not number or not birthday:
        return jsonify({"message": "incomplete fields"}), 400
    
    new_user = User(first_name=first_name, last_name=last_name, address=address, role=role, number=number, birthday=birthday)
    try:
        db.session.add(new_user)
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        return jsonify({"message": str(e)}), 500

    return jsonify({"message": "user created successfully"}), 201

# Update function
@app.route("/update_user/<int:user_id>", methods=["PATCH"])
def update_user(user_id):
    user = User.query.get(user_id)

    if not user:
        return jsonify({"message": "user not found"}), 404
    
    data = request.json
    user.first_name = data.get("firstName", user.first_name)
    user.last_name = data.get("lastName", user.last_name)
    user.address = data.get("address", user.address)
    user.role = data.get("role", user.role)
    user.number = data.get("number", user.number)
    user.birthday = data.get("birthday", user.birthday)

    try:
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        return jsonify({"message": str(e)}), 500
    
    return jsonify({"message": "user updated"}), 200

# Delete function
@app.route("/delete_user/<int:user_id>", methods=["DELETE"])
def delete_user(user_id):
    user = User.query.get(user_id)

    if not user:
        return jsonify({"message": "user not found"}), 404
    
    try:
        db.session.delete(user)
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        return jsonify({"message": str(e)}), 500
    
    return jsonify({"message": "user deleted successfully"})


if __name__ == "__main__":
    with app.app_context():
        db.create_all()

    app.run(debug=True, port=5001)