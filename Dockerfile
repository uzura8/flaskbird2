FROM ubuntu:18.04
USER root

RUN apt-get -y update
RUN apt-get -y install software-properties-common
#RUN apt-get -y install vim

RUN apt-get -y install python3.6-dev
RUN apt-get -y install python3-pip
RUN pip3 install --upgrade pip
RUN apt-get install -y curl

RUN apt-get -y install nginx
RUN rm /etc/nginx/sites-enabled/default
COPY ./nginx/default.conf /etc/nginx/conf.d/

RUN apt-get -y install nodejs npm
RUN npm install n -g
RUN n stable

ADD . /flaskbird
WORKDIR /flaskbird

RUN pip3 install -r /flaskbird/server/requirements.txt
RUN chmod -R 777 /flaskbird/server/var
#RUN mkdir /var/log/uwsgi

RUN npm install
RUN npm run build

EXPOSE 80

CMD ["/bin/bash", "/flaskbird/server/startup.sh"]

