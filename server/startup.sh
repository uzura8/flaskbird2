#!/bin/bash

cd /flaskbird/server
nginx
uwsgi --ini uwsgi.ini

