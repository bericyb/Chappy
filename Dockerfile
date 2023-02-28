FROM node:19.7-alpine as chappy-node

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm i
COPY . .
RUN npm run build
ENV PORT 3000

CMD ["npm", "run", "dev", "--", "--host"]
