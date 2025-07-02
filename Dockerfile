# Dockerfile
FROM node:21.7.1-alpine3.19 as dev

RUN npm install -g pnpm
WORKDIR /app
COPY ./package*.json ./
COPY ./pnpm-lock.yaml ./

ENTRYPOINT ["tail", "-f", "/dev/null"]
