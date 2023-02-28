FROM node:19.7-alpine as build

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build
ENV PORT 3000

FROM node:19.7-alpine
WORKDIR /app
COPY --from=build /app/package.json .
COPY --from=build /app/output/server .
CMD ["node", "index.js"]
