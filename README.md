# Flaskbird

WEB application platform of the general-purpose created by Python, Flask, VueJS and webpack

## Getting Started

### Prerequisites

* Python >= ver3.6.x
* MySQL >= ver5.7



### Installing

Before installing, you need to setup MySQL and Web server.

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
cp server/.flaskenv.sample server/.flaskenv
cp src/client/js/config/config.json.sample src/client/js/config/config.json
```


### 2. Setup ###
Edit configs for your env

Edit server side setting for your environment

```json
vim server/.flaskenv
```

Edit client side setting  for your environment

```json
vim src/client/js/config/config.json
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
    #options Indexes FollowSymLinks +ExecCGI
  </Directory>
</VirtualHost>
```

And start web server.

```
sudo systemctl start httpd
```
