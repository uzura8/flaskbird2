from flask import render_template, current_app
from . import bp
from app.models import SiteConfig


@bp.before_request
def before_request():
    pass


@bp.route('/', defaults={'path': ''})
@bp.route('/<path:path>')
def catch_all(path):
    version = SiteConfig.get_value_by_name('version')
    #version = '2.0.0'
    return render_template(
        'index.html',
        site_name=current_app.config['FBD_SITE_NAME'],
        version=version
    )


## For Let's encrypt confirmation
#@bp.route('/.well-known/acme-challenge/<filename>')
#def well_known(filename):
#    return render_template('.well-known/acme-challenge/'+ filename)
