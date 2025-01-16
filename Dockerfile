# Use official Node.js image to build the Angular app
FROM node:18.19 AS build

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the entire project
COPY . .

# Expose port 4200 for Angular development server
EXPOSE 80

# Run the Angular development server
CMD ["npm", "start"]
