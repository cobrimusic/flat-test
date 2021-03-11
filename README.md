# DPLOY DOCKER

## Introduction

> Development environment for BARRACUDA 

## requerimientos

- Docker
- Docker compose

## Installation

Clone repository with all submodules:

> git clone --recursive git@github.com:oxxo-labs/barracuda-core.git barracuda

Then go to all submodules, located in folders like api, and change branch to master. For example:

> cd pi && git checkout master


## Installation

Build project containers:

> docker-compose -f backend.yml build

Run project:

> docker-compose -f backend.yml up