# syntax=docker/dockerfile:1

FROM node:23-alpine AS base

WORKDIR /app

COPY package*.json ./

RUN npm install --omit=optional


FROM base AS builder

COPY --from=base /app/ /app

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start"]
