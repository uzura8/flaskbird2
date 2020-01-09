#from sqlalchemy.dialects.mysql import TINYINT
from datetime import datetime
from time import time
#import jwt
from flask import current_app, url_for
from app import db
from app.models.base import Base, PaginatedAPIMixin
#from app.models.base import TimestampMixin, PaginatedAPIMixin

class User(Base, PaginatedAPIMixin, db.Model):
    """
    user model
    """
    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(64), nullable=False, index=True, unique=True)
    email = db.Column(db.String(128), nullable=False, index=True, unique=True)
    password = db.Column(db.String(128), nullable=False)
    self_introduction = db.Column(db.Text)
    #file_name = db.Column(db.String(64))
    last_login = db.Column(db.DateTime, default=datetime.utcnow)
    last_access = db.Column(db.DateTime, default=datetime.utcnow)

    #def set_password(self, password):
    #    self.password = generate_password_hash(password)

    #def check_password(self, password):
    #    return check_password_hash(self.password, password)

    #def avatar(self, size):
    #    digest = md5(self.email.lower().encode('utf-8')).hexdigest()
    #    return 'https://www.gravatar.com/avatar/{}?d=identicon&s={}'.format(digest, size)

    #def get_reset_password_token(self, expires_in=600):
    #    return jwt.encode(
    #        {'reset_password': self.id, 'exp': time() + expires_in},
    #        current_app.config['SECRET_KEY'], algorithm='HS256').decode('utf-8')

    #@staticmethod
    #def verify_reset_password_token(token):
    #    try:
    #        id = jwt.decode(token, current_app.config['SECRET_KEY'],
    #                        algorithms=['HS256'])['reset_password']
    #    except:
    #        return
    #    return Member.query.get(id)

    def to_dict(self, include_email=False):
        data = {
            'id': self.id,
            'name': self.name,
            'file_name': self.file_name,
            #'last_access': self.last_access.isoformat() + 'Z',
            #'last_login': self.last_login.isoformat() + 'Z',
            'last_access': self.last_access,
            'last_login': self.last_login,
            'self_introduction': self.self_introduction,
            '_links': {
                'self': url_for('api.get_member', id=self.id),
                'avatar': self.avatar(128)
            }
        }
        if include_email:
            data['email'] = self.email
        return data

    def from_dict(self, data, new_user=False):
        for field in ['name', 'email', 'self_introduction']:
            if field in data:
                setattr(self, field, data[field])
        if new_user and 'password' in data:
            self.set_password(data['password'])


    def save_to_db(self):
        db.session.add(self)
        db.session.commit()


#@login.user_loader
#def load_member(id):
#    return Member.query.get(int(id))
