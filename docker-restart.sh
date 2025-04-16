#!/bin/bash

# Rimuovi i volumi e i contenitori esistenti
docker rm wgdashboard
docker rm rabbitmq

docker volume rm wgdashboard_data
docker volume rm wgdashboard_conf
docker volume rm wgdashboard_rabbitmq-data

# Avvia i contenitori con Docker Compose
docker compose up --build
#docker exec -it wiregate npm --prefix /opt/wireguarddashboard/src/static/app install && docker exec -it wiregate npm --prefix /opt/wireguarddashboard/src/static/app run build