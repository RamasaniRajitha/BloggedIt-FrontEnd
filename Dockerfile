# Use an official Node.js runtime as a parent image
FROM node:18

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy the current directory contents into the container at /app
COPY . .

# Use port 5000 for the node server on the container
EXPOSE 3000
CMD ["npm", "start"]