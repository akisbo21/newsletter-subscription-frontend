FROM node:20-alpine

WORKDIR /srv

COPY src/package.json src/package-lock.json* ./
RUN npm install

COPY src .

CMD ["npm", "run", "dev"]