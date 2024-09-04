# build stage
FROM node:lts-alpine
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install
COPY . .
RUN yarn build     
# production stage
# FROM nginx:stable-alpine as production-stage
# COPY --from=build-stage /app/.next /usr/share/nginx/html
# COPY nginx.conf /etc/nginx/conf.d/default.conf
# CMD ["nginx", "-g", "daemon off;"]

EXPOSE 3200  

# Start the app  
CMD ["yarn", "start"] 