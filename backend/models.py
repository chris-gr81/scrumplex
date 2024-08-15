from .app import db

class UserStory(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    role = db.Column(db.Text, nullable=True)
    aim = db.Column(db.Text, nullable=True)
    benefit = db.Column(db.Text, nullable=True)
    dod = db.Column(db.Text, nullable=True)
    created_at = db.Column(db.DateTime)
    updated_at = db.Column(db.DateTime)

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'role': self.role,
            'aim': self.aim,
            'benefit': self.benefit,
            'dod': self.dod,
            'created_at': str(self.created_at),
            'updated_at': str(self.updated_at)
        }
