# GratefulChat

GratefulChat is a Support Chat System for every site



## Getting Started

### Prerequisites

* NodeJS >= ver10
* MySQL >= ver5.7
* Firebase
* AWS CLI


### Installing

#### Install required libraries

```bash
npm install
```



#### Copy and edit config files.

Edit configs for your env, after copy from sample.

```bash
cp src/server/config/config.json.sample src/server/config/config.json
cp src/client/js/config/config.json.sample src/client/js/config/config.json
```

Edit server side setting  for your environment

```json
// src/server/config/config.json
{
  "port": 8080,
  "session": {
    "secretKey": "secret-key",
    "cookie": {
      "maxAgeHours": 24,
      "secure": false
    }
  },
  "dbs": {
    "mysql": {
      "host": "localhost",
      "port": "3306",
      "user": "username",
      "password": "password",
      "database": "db-name",
      "logging": false
    }
  },
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



#### Create DB

```bash
echo "CREATE DATABASE DB-name DEFAULT CHARACTER SET utf8" | mysql -u user-name -p
mysql -u user-name -p DB-name < data/sql/setup.sql
```



#### Firebase setting

You need register and sign in to [Firebase](https://firebase.google.com/), before below settings

##### Create FIrebase Project

* Set project name
* Set to use GoogleAnalytics, if you need

##### Add web app

Choose icon for "Add Web App"

 ![firebase_config_01](https://raw.githubusercontent.com/uzura8/expressbird/dev_gc/src/doc/assets/img/firebase_config_01.png)

Input app-nickname and push "Register app" button

 ![firebase_config_02](https://raw.githubusercontent.com/uzura8/expressbird/dev_gc/src/doc/assets/img/firebase_config_02.png)

After registered, push "Next" button

And press "Continue to  console" button, then you go back to the project top

##### Set web app config to client side setting

Press "1 app" label, and press the cog icon of registered Web App

 ![firebase_config_03](https://raw.githubusercontent.com/uzura8/expressbird/dev_gc/src/doc/assets/img/firebase_config_03.png)

 ![firebase_config_04](https://raw.githubusercontent.com/uzura8/expressbird/dev_gc/src/doc/assets/img/firebase_config_04.png)

Scroll to "Firebase SDK snippet" section, and select "config" radio button

 ![firebase_config_05](https://raw.githubusercontent.com/uzura8/expressbird/dev_gc/src/doc/assets/img/firebase_config_05.png)

Copy rows in "const firebaseConfig" object on the source code, and paste to  rows from "apiKey" to "appId" in "src/client/js/config/config.json"

```  json
// src/client/js/config/config.json

"firebase": {
    "isEnabled": true,
    "apiKey": "api-key",
    "authDomain": "sample-site.firebaseapp.com",
    "databaseURL": "https://sample-site.firebaseio.com",
    "projectId": "sample-site",
    "storageBucket": "sample-site.appspot.com",
    "messagingSenderId": "sender-id",
    "appId": "app-id"
  },
```

##### Set web app config to server side setting

Press "Service account" tab on "Settings" page, and press "Generate new private key" button

 ![firebase_config_06](https://raw.githubusercontent.com/uzura8/expressbird/dev_gc/src/doc/assets/img/firebase_config_06.jpg)

After downloaded, move the file to "src/server/config/" and rename "firebase-admin-credentials.json"

```bash
mv /path-to-downloaded-file src/server/config/firebase-admin-credentials.json
```



#### For Amazon Lex

1. cp src/server/config/aws-config.json.sample src/server/config/aws-config.json
2. Set your AWS credential

### 5. Setup ###

```bash
npm run build
```


### 6. Create Admin User ###

```bash
node server/create_admin_user.js admin@example.com password 'AdminUser'
```

### 7. Start server ###

```bash
npm run start
```
