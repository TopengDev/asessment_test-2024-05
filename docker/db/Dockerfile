FROM postgres:16.3-alpine3.20

WORKDIR /usr/local/app/db
COPY init.sql /docker-entrypoint-initdb.d/

ENV PGUSER=app

EXPOSE 5432







