FROM node:18

WORKDIR /the/workdir/path

COPY package*.json ./

RUN npm install

COPY . .