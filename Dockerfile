FROM node:21 AS build

WORKDIR /app

COPY package.json /install/
COPY . /app/

CMD ["sh", "-c", "npm install && npm run dev"]
