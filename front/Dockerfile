# For buid stage
FROM node:lts-alpine as build-stage
WORKDIR /app
# copy package.json, package-lock.json
COPY package*.json ./
# install npm modules
RUN npm install
COPY . .
# build assets files
RUN npm run build

# For prod stage
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/public /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
