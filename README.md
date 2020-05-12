# Flaskbird

WEB application platform of the general-purpose created by Python, Flask, VueJS

## Getting Started

### Prerequisites

* Docker >= 19.03.X
* docker-compose >= 1.25.X

### Installing on Docker Container on your machine

Before installing, you need to setup Docker.

````bash
cp docker-compose.yml.sample docker-compose.yml
vim docker-compose.yml
# set values for your env

docker-compose build
docker-compose up -d
````

You can access http://localhost:8000/ on browser.
