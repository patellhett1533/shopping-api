FROM node:latest

WORKDIR /app

COPY package*.json .

RUN npm ci

RUN npm i nodemon

COPY . .

CMD npm start