FROM node:18.12.1-alpine

WORKDIR /app

RUN apk add --no-cache git

COPY . .

RUN npm install

EXPOSE 8080

CMD ["npm", "start"]