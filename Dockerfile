FROM node:22-alpine3.20

ARG user=app
ARG workdir=/usr/local/app

WORKDIR $workdir

COPY package*.json ./
RUN npm install -g npm@10.8.0
# RUN npm i -g yarn
RUN yarn install
COPY . .

RUN addgroup -S appgroup
RUN adduser -g $user -h $workdir -s /bin/sh -D -G appgroup app appgroup
RUN adduser $user wheel
RUN apk add doas
RUN echo /etc/doas.d/doas.conf -e "\npermit persist :wheel"
USER app

ENV PORT=3002

EXPOSE 3002

CMD ["yarn", "dev"]





