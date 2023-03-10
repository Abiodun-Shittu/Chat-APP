FROM node:lts-alpine3.17

WORKDIR /usr/src/app

COPY package.json .

RUN yarn install

COPY . .

EXPOSE 6000

CMD ["yarn", "start"]
