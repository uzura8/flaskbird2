#FLASKBIRD_ENV = 'prod' # choices: 'local', 'dev', 'stg', 'prod'
#DEBUG = False

SECRET_KEY = 'input your secret_key' # Set unguessable random string for encrypting db settings and session info
SQLALCHEMY_DATABASE_URI = 'mysql+pymysql://flaskbird2_db:@localhost:3306/db-name?charset=utf8'
#SQLALCHEMY_ECHO = True

FBD_SITE_NAME = 'Sample Site'
FBD_ADMIN_MAIL = 'admin@example.com'
FBD_ADMIN_COMPANY_NAME = 'Sample Site Administrator'
FBD_ADMIN_COMPANY_SITE_URL = 'https://www.example.com/'

