# Step 1: Use Node.js to build the Angular app
FROM node:18.19 AS build

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

# Build the Angular app (production build)
RUN npm run build --prod

# Step 2: Use Nginx to serve the built Angular app
FROM nginx:alpine

# Copy the built Angular app to Nginx's default directory
COPY --from=build /app/dist/your-app-name /usr/share/nginx/html

# Expose the port Nginx is listening on
EXPOSE 80

# Start Nginx server
# CMD ["nginx", "-g", "daemon off;"]

# Run the Angular development server
CMD ["npm", "start"]
