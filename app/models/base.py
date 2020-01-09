from datetime import datetime
from sqlalchemy.orm.exc import NoResultFound
from app import db

#class TimestampMixin(object):
#    created_at = db.Column(
#        db.DateTime, nullable=False, default=datetime.utcnow)
#    updated_at = db.Column(db.DateTime, onupdate=datetime.utcnow)


class Base(db.Model):
    __abstract__ = True

    created_at = db.Column(
        db.DateTime, nullable=False, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, onupdate=datetime.utcnow)


    @classmethod
    def get_one_by_pk(self, value, prop='id'):
        try:
            return self.query.filter(getattr(self, prop) == value).one()
        except NoResultFound:
            return None


    @classmethod
    def get_one_by_id(self, id):
        return self.get_one_by_pk(id)


    @classmethod
    def delete(self, pk_value, pk_prop='id'):
        if not pk_value:
            raise ValueError('{} is invalid'.format(pk_prop))
        try:
            item = self.get_one_by_pk(pk_value, pk_prop)
            item_dict = item.to_dict()
        except NoResultFound:
            raise ValueError('{} is invalid'.format(pk_prop))

        db.session.delete(item)
        db.session.commit()

        return item_dict


class PaginatedAPIMixin(object):
    @staticmethod
    def to_collection_dict(query, page, per_page, endpoint, **kwargs):
        resources = query.paginate(page, per_page, False)
        data = {
            'items': [item.to_dict() for item in resources.items],
            '_meta': {
                'page': page,
                'per_page': per_page,
                'total_pages': resources.pages,
                'total_items': resources.total
            },
            '_links': {
                'self': url_for(endpoint, page=page, per_page=per_page,
                                **kwargs),
                'next': url_for(endpoint, page=page + 1, per_page=per_page,
                                **kwargs) if resources.has_next else None,
                'prev': url_for(endpoint, page=page - 1, per_page=per_page,
                                **kwargs) if resources.has_prev else None
            }
        }
        return data
