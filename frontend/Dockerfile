FROM node:14-alpine

WORKDIR /frontend/src/app

COPY package*.json ./
COPY .env /app/.env

RUN npm cache clean --force
RUN npm install

COPY . .

EXPOSE 3000

CMD [ "npm", "run", "dev" ]