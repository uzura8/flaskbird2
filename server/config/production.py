from config import BaseConfig

class ProductionConfig(BaseConfig):
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_ECHO = False

    CORS_RESOURCES = {r'/api/*': {'origins': ['http://example.com']}}
