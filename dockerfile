# Use an official Node.js runtime as a parent image
FROM node:14

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY client/package*.json ./client/
COPY server/package*.json ./server/

# Install client and server dependencies
RUN cd client && npm install
RUN cd server && npm install

# Expose ports for the client and server
EXPOSE 3000 5000

# Start the MongoDB setup, client, and server applications
CMD ["sh", "-c", \
    "mongod & sleep 5 && \
    mongo && \
    use mytododb && \
    db.createCollection('todos') && \
    cd client && npm start & cd server && npm start"]
