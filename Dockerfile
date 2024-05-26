FROM node:22-alpine3.20 as base

ARG user=app
ARG workdir=/usr/local/app

WORKDIR $workdir

COPY ./package*.json ./

RUN npm install -g npm@10.8.0
RUN yarn install
COPY ./ .


RUN apk add postgresql

COPY entrypoint.sh /entrypoint.sh

ENV PORT=3000

EXPOSE 3000

CMD ["yarn", "dev"]


