# D-PLOY DOCKER

## Requerimientos

- Docker
- Docker compose

## Installation

Clone repository:

> git clone git@github.com:cobrimusic/dploy-app-core.git

## Installation

Build project containers:

> docker-compose -f backend.yml build

Run migrations:

> docker-compose -f backend.yml exec api python manage.py migrate 

Run for create superuser:

> docker-compose -f backend.yml exec api python manage.py createsuperuser --username dev --email dev@mail.com

Run project:

> docker-compose -f backend.yml up

Generate token:

> [POST] 0.0.0.0:8001/api/token/
> In body {"username": "dev", "email": "dev@mail.com"}

Request api:
> [GET] 0.0.0.0:8001/api/rates 
> In request header: Authorization 'Token xxxxxxaaaaaaasssss"