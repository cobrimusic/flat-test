# D-PLOY DOCKER

## Requerimientos

- Docker
- Docker compose

## Installation

Clone repository:

> git clone git@github.com:cobrimusic/dploy-app-core.git

## Installation

Build project containers:

> docker-compose -f backend.yml up --build

Run migrations in other terminal tab:

> docker-compose -f backend.yml exec api python manage.py migrate 

Run for create superuser:

> docker-compose -f backend.yml exec api python manage.py createsuperuser --username dev --email dev@mail.com and type a password

Generate token:

> [POST] 0.0.0.0:8001/api/token/
> In body {"username": "dev", "password": "generated password"}

Token in react app:
> www/app/
> Touch a .env file and put the token generated
> REACT_APP_TOKEN={your_token}
> Maybe you need to down docker and up again