#stage 1
FROM node:22 as dev
RUN mkdir -p /app
WORKDIR /app
COPY --chown=node:node package*.json ./
RUN npm install -g @angular/cli@19
RUN npm install --verbose
COPY --chown=node:node . .
RUN npm run build
#stage 2
FROM nginx
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=dev /app/dist/fronted-angular/browser /usr/share/nginx/html
# Expose port 80
EXPOSE 80
