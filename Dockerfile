FROM ubuntu:18.04
USER root

RUN apt-get -y update
RUN apt-get -y install software-properties-common

RUN apt-get -y install python3.6-dev
RUN apt-get -y install python3-pip
RUN pip3 install --upgrade pip
RUN apt-get install wget -y

RUN apt-get -y install nodejs npm
RUN npm install n -g
RUN n stable

ARG project_dir=/flaskbird
ADD . $project_dir
WORKDIR $project_dir
RUN pip3 install -r ${project_dir}/server/requirements.txt
RUN chmod -R 777 ${project_dir}/server/var

RUN npm install
RUN npm run build
