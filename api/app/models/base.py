from datetime import datetime
from sqlalchemy.orm.exc import NoResultFound
from app import db

class Base(db.Model):
    __abstract__ = True

    created_at = db.Column(
        db.DateTime, nullable=False, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, onupdate=datetime.utcnow)


    @classmethod
    def get_one_by_ukey(self, value, prop='id'):
        try:
            return self.query.filter(getattr(self, prop) == value).one()
        except NoResultFound:
            return None


    @classmethod
    def get_one_by_id(self, id):
        return self.get_one_by_ukey(id)


    @classmethod
    def get_all(self, is_dict=False):
        try:
            res = self.query.all()

            if is_dict:
                return [r.to_dict() for r in res]
            else:
                return res

        except NoResultFound:
            return []


    @classmethod
    def delete(self, pk_value, prop='id'):
        if not pk_value:
            raise ValueError('{} is invalid'.format(prop))
        try:
            item = self.get_one_by_ukey(pk_value, prop)
            item_dict = item.to_dict()
        except NoResultFound:
            raise ValueError('{} is invalid'.format(prop))

        db.session.delete(item)
        db.session.commit()

        return item_dict
