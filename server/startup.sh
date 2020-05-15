#!/bin/bash

# アプリケーションディレクトリに移動
cd /flaskbird/server

# uwsgi起動
uwsgi --ini uwsgi.ini

# nginx起動
nginx -g "daemon off;"
