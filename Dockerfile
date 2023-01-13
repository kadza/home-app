FROM node:18.13.0-alpine

RUN npm install -g pnpm@7.25

COPY . /app
WORKDIR /app
RUN pnpm install
RUN pnpm build

EXPOSE 8080
CMD [ "node", "build/index.js" ]