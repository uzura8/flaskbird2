from flask import jsonify, Blueprint
from flask import Blueprint
from app.common.helper import url_static

bp = Blueprint('api', __name__, url_prefix='/api')

class InvalidUsage(Exception):
    status_code = 400

    def __init__(self, message, status_code=None, payload=None):
        Exception.__init__(self)
        self.message = message
        if status_code is not None:
            self.status_code = status_code
        self.payload = payload

    def to_dict(self):
        rv = dict(self.payload or ())
        rv['message'] = self.message
        return rv

bp = Blueprint('api', __name__, url_prefix='/api')

@bp.context_processor
def helper_processor():
    return dict(url_static=url_static)

@bp.errorhandler(InvalidUsage)
def handle_invalid_usage(error):
    response = jsonify(error.to_dict())
    response.status_code = error.status_code
    return response

from . import contact
from . import users

