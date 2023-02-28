FROM node:19.7-alpine as build

WORKDIR /app
COPY package.json package-lock.json ./
COPY . .
RUN npm ci
RUN npm run build
ENV PORT 3000

FROM node:19.7-alpine as chappy-node
WORKDIR /app
RUN rm -rf ./*
COPY --from=build /app/package.json .
COPY --from=build /app/build .
CMD ["node", "index.js"]
