# Flaskbird

WEB application platform of the general-purpose created by Python, Flask, VueJS and webpack

## Getting Started

### Prerequisites

* Python >= ver3.7.x
* MySQL >= ver5.7



### Installing

Before installing, you need to setup MySQL and Web server.

#### Install required libraries

```bash
pip install -r requirements.txt
npm install
```

#### Copy and edit config files

Edit configs for your env, after copy from sample.

```bash
chmod -R 777 var
cp adapter.wsgi.sample adapter.wsgi
vim adapter.wsgi
cp instance/config.py.sample instance/config.py
cp src/client/js/config/config.json.sample src/client/js/config/config.json
```


### 2. Setup ###
Edit configs for your env

Edit server side setting  for your environment

```json
// instance/config.py
```

Edit client side setting  for your environment

```json
// src/client/js/config/config.json
{
  "domain": "localhost",
  "port": 8080,
  "baseUrl": "/",
  "isSSL": false,
  "siteName": "Sample Site",
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
  WSGIScriptAlias / /var/www/sites/example.com/adapter.wsgi
  <Directory "/var/www/sites/example.com/">
    Order deny,allow
    Allow from all
    #options Indexes FollowSymLinks +ExecCGI
  </Directory>
</VirtualHost>
```

And start web server.

```
sudo systemctl start httpd
```
