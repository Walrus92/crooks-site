FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .
COPY /prisma/dev.db ./dev.db

EXPOSE 3000

CMD ["npx", "ts-node", "server.ts"]
