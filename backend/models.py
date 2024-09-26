from config import db

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(80), unique=False, nullable=False)
    last_name = db.Column(db.String(80), unique=False, nullable=False)
    address = db.Column(db.String(80), unique=False, nullable=True)
    role = db.Column(db.Enum("Developer", "QA", "Manager", name="role_types"))
    number = db.Column(db.String(20), unique=False, nullable=True)
    birthday = db.Column(db.Date)

    def to_json(self):
        return {
            "id": self.id,
            "firstName": self.first_name,
            "lastName": self.last_name,
            "address": self.address,
            "role": self.role,
            "number": self.number,
            "birthday": self.birthday,
        }
