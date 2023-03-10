FROM node:lts-alpine3.17

WORKDIR /usr/src/app

RUN yarn install

COPY . .

EXPOSE 6000
