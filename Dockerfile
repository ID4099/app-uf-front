FROM node:latest as node
WORKDIR /app

COPY ./ /app/

# Copy all package*.json file
COPY package*.json ./

# Install dependencies
RUN npm install

RUN npm run build

# Stage 1, based on Nginx, to have only the compiled app, ready for production with Nginx
FROM nginx:alpine
COPY --from=node /app/dist/app-uf-front/browser /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf