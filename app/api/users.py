from flask import current_app, jsonify, request, url_for
from app import db
from app.models.user import User
from . import bp
#from app.api.auth import token_auth
#from app.api.errors import bad_request


@bp.route('/users/<int:id>', methods=['GET'])
#@token_auth.login_required
def get_user(id):
    return jsonify(User.query.get_or_404(id).to_dict())


@bp.route('/users', methods=['GET'])
#@token_auth.login_required
def get_users():
    param = current_app.config['PARAMS_LIST_DEFAULT'];
    page = request.args.get('page', 1, type=int)
    per_page = min(
            request.args.get('per_page', param['per_page'], type=int),
            param['per_page_max'])
    data = User.to_collection_dict(User.query, page,
                                    per_page, 'api.get_users')
    return jsonify(data)

