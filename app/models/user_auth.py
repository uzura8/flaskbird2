from app import db
from app.models.base import Base

class UserAuth(Base, db.Model):
    """
    user_auth model
    """
    __tablename__ = 'user_auth'
    id = db.Column('id', db.Integer, primary_key=True, autoincrement=True)
    user_id = db.Column('user_id', db.Integer, \
        db.ForeignKey('user.id', ondelete='CASCADE'), nullable=False)
    email = db.Column(db.String(128), nullable=False, index=True, unique=True)
    password = db.Column(db.String(128), nullable=False)

    def to_dict(self):
        data = {
            'id': self.id,
            'user_id': self.user_id,
            'email': self.email,
            'password': self.password,
        }
        return data

