# syntax=docker/dockerfile:1
FROM python:3.8
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
ENV PORT 8080

RUN mkdir /services/
# COPY requirements.txt /services/

RUN apt-get update
RUN apt-get -y install python3-dev
RUN apt-get -y install libevent-dev
RUN apt-get install build-essential
RUN apt-get -y install gcc
RUN apt-get install g++

RUN pip install --upgrade pip && pip install wheel
# RUN pip install docker-compose
COPY . /services/
WORKDIR /services
# RUN cd API/scrum-master
RUN pip install -r requirements.txt
# RUN python manage.py migrate
# RUN python manage.py runserver 0.0.0.0:8000
EXPOSE 8080


ADD script.sh /
RUN chmod +x /script.sh

CMD ["/script.sh"]
