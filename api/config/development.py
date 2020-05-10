from config import BaseConfig

class DevelopmentConfig(BaseConfig):
    SQLALCHEMY_TRACK_MODIFICATIONS = True
    SQLALCHEMY_ECHO = True

    CORS_RESOURCES = {r'/api/*': {'origins': '*'}}
