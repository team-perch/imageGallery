FROM node:10.15-alpine

RUN mkdir -p /src/app

WORKDIR /src/app

COPY . /src/app

COPY wait-for-it.sh /wait-for-it.sh

RUN apk update && apk add bash

RUN npm install

EXPOSE 3003