# build from source
# ----------------------------
FROM node:18 AS build

WORKDIR /app

COPY package*.json .
RUN npm install

COPY . .

# Argument for environment (default to production)
ARG NODE_ENV=production

# Build the Angular app based on the environment argument
RUN if [ "$NODE_ENV" = "production" ] ; then npm run build --prod ; else npm run build ; fi

# RUN npm run build

# ----------------------------
# run with nginx
# ----------------------------
FROM nginx

RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d
COPY --from=build /app/dist/frontend /usr/share/nginx/html

EXPOSE 80



