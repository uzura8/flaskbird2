Installation
============

### 1. Install required libraries ###

```
npm install
```

### 2. Setup ###
Edit configs for your env

```
cp src/server/config/config.json.sample src/server/config/config.json
vi src/server/config/config.json
cp src/client/js/config/config.json.sample src/client/js/config/config.json
vi src/client/js/config/config.json
```

### 3. Create DB ###

```
echo "CREATE DATABASE DB-name DEFAULT CHARACTER SET utf8" | mysql -u user-name -p
mysql -u user-name -p DB-name < data/sql/setup.sql
```

### 4. Setup ###

```
npm run build
```

### 5. Start server ###

```
npm run start
```
