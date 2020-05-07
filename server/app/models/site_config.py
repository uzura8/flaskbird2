from sqlalchemy.orm.exc import NoResultFound
from app import db
from . import Base


class SiteConfig(Base):
    """
    site_config model
    """
    __tablename__ = 'site_config'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), index=True, unique=True)
    value = db.Column('value', db.Text)


    def to_dict(self):
        data = {
            'name': self.name,
            'value': self.value,
        }
        return data


    @classmethod
    def get_one_by_name(self, name):
        return self.get_one_by_ukey(name, 'name')


    @classmethod
    def get_value_by_name(self, name):
        config = self.get_one_by_name(name)
        return config.value if config else None


    @classmethod
    def get_dict(self):
        try:
            rows = self.query.all()
            configs = {}
            for row in rows:
                key = row.name
                configs[key] = row.value
            return configs
        except NoResultFound:
            return None


    @classmethod
    def save_by_name(self, name, value):
        config = self.get_one_by_name(name)

        if config and config.value == value:
            return config

        elif not config:
            config = self(
                name=name,
                value=value
            )

        else:
            config.value = value

        db.session.add(config)
        db.session.commit()
        return config
