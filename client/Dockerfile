# build stage
FROM node:lts-alpine
# Set the working directory inside the container  
WORKDIR /app  

# Copy package.json and package-lock.json to the container  
COPY package*.json ./  

# Install dependencies  
RUN yarn install  

# Copy the app source code to the container  
COPY . .  

# Build the Next.js app  
RUN yarn build 

# Expose the port the app will run on  
EXPOSE 3000

# Start the app  
CMD ["yarn", "start"]  