FROM node:20.11.1-alpine3.19

# set the working directory
WORKDIR /app

# copy dependencies file
COPY package.json yarn.lock ./

# COPY prisma directory
COPY prisma ./prisma/

# COPY ENV variable
COPY .env ./

# COPY tsconfig.json file
COPY tsconfig.json ./

# Install dependencies
RUN yarn install



# Copy everything 
COPY . .

EXPOSE 7000 4000


RUN yarn build
# run the project
CMD yarn startmigrate