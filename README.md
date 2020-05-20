# Flaskbird

WEB application platform of the general-purpose created by Python, Flask, VueJS and webpack

## Getting Started

### Installing on Docker Container on your machine

#### Prerequisites

* Docker >= ver19.03.X

Before installing, you need to setup Docker.

````bash
cp docker-compose.yml.sample docker-compose.yml
vim docker-compose.yml
# set values for your env

docker-compose build
docker-compose up -d
````

You can access http://0.0.0.0:8000/ on browser.



### Installing for WEB Server by Apache

#### Prerequisites

* Python >= ver3.6.x
* MySQL >= ver5.7
* Apache >= ver2.4.X

#### Install required libraries

```bash
npm install
cd server
pip install -r requirements.txt
```

#### Copy and edit config files

Edit configs for your env, after copy from sample.

```bash
chmod -R 777 server/var
cp server/adapter.wsgi.sample server/adapter.wsgi
vim server/adapter.wsgi
```

````python
# server/adapter.wsgi

import sys
sys.path.insert(0, '/path-to-project-dir')

from run import app as application
````

### 2. Setup ###

Edit configs for your env

Set server side setting  by environment variable for your environment

```bash
export FLASK_ENV=production # available production / development

# Set unguessable random string for encrypting db settings and session info
export SECRET_KEY="your-secret_key"

# Set database connection info
export DB_HOST="localhost"
export DB_PORT="3306"
export DB_USER="root"
export DB_PASSWORD="set-your-password"
#export DB_DBNAME="flaskbird2_db"
```


#### Build source

```bash
npm run build
```

#### Create Admin User

```bash
// TODO: implement
```


### WEB Server Setting ###

If use Apache, Edit config file like below.

```
sudo vim /etc/httpd/conf.d/virtual.conf

LoadModule wsgi_module /PATH-TO-SITE_PACKAGES/site-packages/mod_wsgi/server/mod_wsgi-py************.so
<VirtualHost *:80>
  ServerName example.com
  DocumentRoot /var/www/sites/example.com
  WSGIScriptAlias / /var/www/sites/example.com/server/adapter.wsgi
  <Directory "/var/www/sites/example.com/">
    Order deny,allow
    Allow from all
  </Directory>
</VirtualHost>
```

And start web server.

```
sudo systemctl start httpd
```

