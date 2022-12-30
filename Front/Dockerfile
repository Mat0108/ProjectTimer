FROM node:13.12.0-alpine as node

EXPOSE 4000:4000

WORKDIR /app

COPY package*.json ./

RUN npm i

COPY . .

CMD ["npm", "start"]