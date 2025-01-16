# Use official Node.js image to build the Angular app
FROM node:16 AS build

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the entire project
COPY . .

# Build the Angular app (production build)
RUN npm run build --prod

# Use Nginx to serve the Angular app
FROM nginx:alpine

# Copy the built Angular app to the Nginx server
COPY --from=build /app/dist/ashtarangi-electricity-UI /usr/share/nginx/html

# Expose the port Nginx is listening on
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
