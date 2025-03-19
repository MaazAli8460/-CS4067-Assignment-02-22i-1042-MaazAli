# Use a minimal Node.js image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install production dependencies
RUN npm install --production

# Copy the rest of the application code
COPY . .

# Expose port (specified as 5003)
EXPOSE 5003

# Start the application
CMD ["node", "index.js"]