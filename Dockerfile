FROM node:22-alpine3.20 as base

ARG user=app
ARG workdir=/usr/local/app

WORKDIR $workdir

COPY ./package*.json ./

RUN npm install -g npm@10.8.0
# RUN npm i -g yarn
RUN yarn install
COPY ./ .

# FROM base as migration

# RUN apk update && apk add bash

# COPY wait-for-it.sh /wait-for-it.sh
# RUN chmod +x /wait-for-it.sh

# RUN npx prisma generate
# RUN /wait-for-it.sh db:5432 -t 0 -- npx prisma migrate dev

# FROM base

# COPY --from=base /usr/local/app /usr/local/app

RUN apk add postgresql

COPY entrypoint.sh /entrypoint.sh
# RUN chmod +x /entrypoint.sh



# RUN addgroup -S appgroup
# RUN adduser -g $user -h $workdir -s /bin/sh -D -G appgroup app appgroup
# RUN adduser $user wheel
# RUN apk add doas
# RUN echo /etc/doas.d/doas.conf -e "\npermit persist :wheel"
# USER app

ENV PORT=3000

EXPOSE 3000

# ENTRYPOINT ["/entrypoint.sh"]
CMD ["yarn", "dev"]


