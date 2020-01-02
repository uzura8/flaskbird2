import os
from flask import url_for, current_app
from app.common.util import is_array


def config_js():
    return {
        'BASE_URL': url_for('site.index'),
        'SITE_NAME': current_app.config['SITE_NAME'],
        'SERVICE_URL': current_app.config['SERVICE_URL'],
    }


def static_dir_path(under_path='', os_path=False):
    static_dir_path = current_app.static_url_path
    if not os_path:
        if is_array(under_path):
            under_path = os.path.join(*under_path)
        return '{}/{}'.format(static_dir_path, under_path)

    items = [static_dir_path.strip(os.sep)]
    items.insert(0, 'app')
    if not is_array(under_path):
        under_path = under_path.strip(os.sep)
    items.extend(under_path)
    return os.path.join(*items)

