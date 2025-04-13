# FROM alpine:3.20

FROM node:20-alpine

WORKDIR /usr/src/smart-brain-api

RUN apk add --no-cache bash curl

COPY . .

RUN npm install --legacy-peer-deps

EXPOSE 3000

CMD ["npm", "start"]

