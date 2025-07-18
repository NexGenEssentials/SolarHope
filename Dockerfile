FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

ENV NODE_ENV=production

EXPOSE 80

CMD ["npx", "next", "start", "-p", "80"]