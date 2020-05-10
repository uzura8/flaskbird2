import os
import importlib
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_mail import Mail
from flask_cors import CORS
from werkzeug.exceptions import HTTPException

db = SQLAlchemy()
mail = Mail()


def create_app():
    app = Flask(__name__)
    #app = Flask(
    #    __name__,
    #    instance_relative_config=True,
    #    instance_path=os.path.dirname(os.path.abspath(__file__)) + '/../instance',
    #    static_folder='../../public/assets',
    #    template_folder='../../public')

    #jinja_options = app.jinja_options.copy()
    #jinja_options.update({
    #    'block_start_string': '[%',
    #    'block_end_string': '%]',
    #    'variable_start_string': '[[',
    #    'variable_end_string': ']]',
    #    'comment_start_string': '[#',
    #    'comment_end_string': '#]'
    #})
    #app.jinja_options = jinja_options

    env = os.environ.get('FLASK_ENV', 'production')
    app.config.from_object('config.{}.{}Config'.format(env, env.capitalize()))

    db_uri = 'mysql+pymysql://{}:{}@{}:{}/{}?charset=utf8'.format(
        os.environ.get('DB_USER', 'root'),
        os.environ.get('DB_PASSWORD', ''),
        os.environ.get('DB_HOST', 'localhost'),
        os.environ.get('DB_PORT', '3306'),
        os.environ.get('DB_DBNAME', 'flaskbird2_db')
    )
    app.config['SQLALCHEMY_DATABASE_URI'] = db_uri

    db.init_app(app)
    mail.init_app(app)
    cors = CORS(app,
            resources=app.config['CORS_RESOURCES'],
            support_credentials=True)

    modules = ('site', 'api')
    for module_name in modules:
        m = importlib.import_module('app.' + module_name)
        app.register_blueprint(m.bp)

    return app

import app.models


class InvalidArgumentException(HTTPException):
    code = 400
    description = 'Invalid Argument'


class InvalidParameterException(HTTPException):
    code = 400
    description = 'Invalid Parameter'


class InvalidMediaPathException(HTTPException):
    code = 400
    description = 'Invalid media File path'


class NotAcceptableException(HTTPException):
    code = 406
    description = 'Not Acceptable'
