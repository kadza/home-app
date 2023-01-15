FROM node:18.13.0-alpine

RUN npm install -g pnpm@7.25

RUN mkdir /app
COPY .npmrc package.json pnpm-lock.yaml /app
RUN cd /app && pnpm install

COPY . /app
RUN cd /app && pnpm build

EXPOSE 8080
CMD [ "node", "app/build/index.js" ]