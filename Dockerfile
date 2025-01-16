# Step 1: Use Node.js to build the Angular app
FROM node:18.19 AS build

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

# Build the Angular app (production build)
RUN npm run build

# Step 2: Use Nginx to serve the built Angular app
FROM nginx:alpine

# Copy the built Angular app to Nginx's default directory
COPY --from=build /app/dist/ashtarangi-electricity-UI/browser /usr/share/nginx/html

# Expose the port Nginx is listening on
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]

