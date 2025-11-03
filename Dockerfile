FROM node:20-alpine
WORKDIR /usr/src/app

COPY package.json package-lock.json ./

RUN npm install

COPY app.js .

COPY .env .

COPY public ./public

EXPOSE 3000

CMD [ "node", "app.js" ]