FROM node:16-alpine3.14 as builder

WORKDIR /app
COPY package.json .
RUN yarn install
COPY . .
RUN npm run build

FROM nginx:1.21.3-alpine
EXPOSE 3000
COPY ../nginx/default.prod.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build /usr/share/nginx/html