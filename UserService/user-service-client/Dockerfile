# Build stage
FROM node:18-alpine AS build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies (including devDependencies for build)
RUN npm install

# Copy the rest of the frontend code
COPY . .

# Build the frontend app (assumes React or similar with a build script)
RUN npm run build

# Production stage
FROM node:18-alpine

# Install serve to host the static files
RUN npm install -g serve

# Set working directory
WORKDIR /app

# Copy built files from the build stage
COPY --from=build /app/build ./build

# Expose port (specified as 3000)
EXPOSE 3000

# Start the app
CMD ["serve", "-s", "build", "-l", "3000"]