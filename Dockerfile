FROM python:3.7

ARG project_dir=/flaskbird/
ADD . $project_dir
WORKDIR $project_dir
RUN pip install --upgrade pip
RUN pip install -r ${project_dir}server/requirements.txt
