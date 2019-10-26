# GratefulChat

GratefulChat is a Support Chat System for every site



## Getting Started

### Prerequisites

* NodeJS >= ver10
* MySQL >= ver5.7
* Firebase
* AWS CLI



### Installing

Before installing, you need to setup NodeJS, MySQL and Web server.



#### Install required libraries

```bash
npm install
```



#### Copy and edit config files

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

Choose icon for "Add Web App" ![firebase_config_01](https://raw.githubusercontent.com/uzura8/expressbird/dev_gc/src/doc/assets/img/firebase_config_01.png)



Input app-nickname and push "Register app" button

![firebase_config_02](https://raw.githubusercontent.com/uzura8/expressbird/dev_gc/src/doc/assets/img/firebase_config_02.png)



After registered, push "Next" button

And press "Continue to  console" button, then you go back to the project top



##### Set web app config to client side setting

Press "1 app" label, and press the cog icon of registered Web App ![firebase_config_03](https://raw.githubusercontent.com/uzura8/expressbird/dev_gc/src/doc/assets/img/firebase_config_03.png)

 ![firebase_config_04](https://raw.githubusercontent.com/uzura8/expressbird/dev_gc/src/doc/assets/img/firebase_config_04.png)



Scroll to "Firebase SDK snippet" section, and select "config" radio button ![firebase_config_05](https://raw.githubusercontent.com/uzura8/expressbird/dev_gc/src/doc/assets/img/firebase_config_05.png)



Copy rows in "const firebaseConfig" object on the source code, and paste to  rows from "apiKey" to "appId" in "src/client/js/config/config.json".
You have to add double quotation to key string for json format.

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



##### Authentication setting

Open Authentication page.

![firebase_config_07](https://raw.githubusercontent.com/uzura8/expressbird/dev_gc/src/doc/assets/img/firebase_config_07.jpg)



Register "Email/Password" and "Anonymous" for "Sign-in providers"

![firebase_config_08](https://raw.githubusercontent.com/uzura8/expressbird/dev_gc/src/doc/assets/img/firebase_config_08.jpg)

![firebase_config_09](https://raw.githubusercontent.com/uzura8/expressbird/dev_gc/src/doc/assets/img/firebase_config_09.jpg)



#### For Lambda

##### Create Lambda function for chat bot on AWS Console

Create new function.

![lambda_setting_01](https://raw.githubusercontent.com/uzura8/expressbird/dev_gc/src/doc/assets/img/lambda_setting_01.png)

Select "Auter from scrach", input "Function name" and select "Node.js 10.x" for Runtime" 
And push "Create function"

![lambda_setting_02](https://raw.githubusercontent.com/uzura8/expressbird/dev_gc/src/doc/assets/img/lambda_setting_02.png)



##### Upload function from local

Before execute this section, you have to setup [AWS CLI](https://docs.aws.amazon.com/cli/) on your env. 
Refer to [AWS Document](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-install.html)

Clone Lex Bot Function from [Github](https://github.com/uzura8/gc-support-chat-lex-bot), and execute deploy command.

```bash
cd /path-to-your-dir
git clone git@github.com:uzura8/gc-support-chat-lex-bot.git
cd gc-support-chat-lex-bot
cp setup.conf.sample setup.conf
vi setup.conf
# Edit for your env
sh deploy.sh
```



#### For Amazon Lex

##### Create Chat Bot

Singn in AWS console, and move to Amazon Lex page.

Put create bot button

![lex_config_01](https://raw.githubusercontent.com/uzura8/expressbird/dev_gc/src/doc/assets/img/lex_config_01.png)



Select "Custom bot", and input Bot name, Output voice and COPPA, then push "Create" button.

![lex_config_02](https://raw.githubusercontent.com/uzura8/expressbird/dev_gc/src/doc/assets/img/lex_config_02.png)



##### Create Intent

Push "Create Intent" button

![lex_config_03](https://raw.githubusercontent.com/uzura8/expressbird/dev_gc/src/doc/assets/img/lex_config_03.png)



Create Slot to select number like below.

###### Example

* Name: "SelectNum"
* Slot type: AMZAON.NUMBER
* Prompt: Which number?

![lex_config_04](https://raw.githubusercontent.com/uzura8/expressbird/dev_gc/src/doc/assets/img/lex_config_04.png)



Register sample utterance.

![lex_config_05](https://raw.githubusercontent.com/uzura8/expressbird/dev_gc/src/doc/assets/img/lex_config_05.png)



In "Fulfillment" section, select "Lambda function" and select your lambda function.  
And Build and test.   
And publish.

![lex_config_06](https://raw.githubusercontent.com/uzura8/expressbird/dev_gc/src/doc/assets/img/lex_config_06.png)

![lex_config_07](https://raw.githubusercontent.com/uzura8/expressbird/dev_gc/src/doc/assets/img/lex_config_07.png)



##### Create IAM User for Amazon Lex

Open AIM page on AWS console and press "Users" link.

![lex_config_08](https://raw.githubusercontent.com/uzura8/expressbird/dev_gc/src/doc/assets/img/lex_config_08.png)



Press "Add User" button.

![lex_config_09](https://raw.githubusercontent.com/uzura8/expressbird/dev_gc/src/doc/assets/img/lex_config_09.png)



Input "User name" and select "Programatic access" for access type.

![lex_config_10](https://raw.githubusercontent.com/uzura8/expressbird/dev_gc/src/doc/assets/img/lex_config_10.png)



Select "Attach existing policies directly", and Check "AmazonLexRunBotsOnly" forPollicy name

![lex_config_11](https://raw.githubusercontent.com/uzura8/expressbird/dev_gc/src/doc/assets/img/lex_config_11.png)



Press "Create user" button.

![lex_config_12](https://raw.githubusercontent.com/uzura8/expressbird/dev_gc/src/doc/assets/img/lex_config_12.png)



Copy "Access key ID" and "Secret access key" on complete page.

![lex_config_13](https://raw.githubusercontent.com/uzura8/expressbird/dev_gc/src/doc/assets/img/lex_config_13.png)



##### Setup config for AWS

Copy from sample file.

```bash
cp src/server/config/aws-config.json.sample src/server/config/aws-config.json
vi src/server/config/aws-config.json
```

Edit config.  
Paste accessKeyId and secretAccessKey.

```json
{
  "lex": {
    "credential": {
      "accessKeyId": "Paste here!",
      "secretAccessKey": "Paste here!",
      "region": "us-west-2"
    },
    "bots": {
      "initialSupport": "GCSupportBot"
    }
  }
}
```



#### Build source

```bash
npm run build
```



#### Create Admin User

```bash
node server/create_admin_user.js admin@example.com password 'AdminUser'
```



### Start server ###

```bash
npm run start
```
