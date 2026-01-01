
FROM node:18

# Install Firebase CLI
RUN npm install -g firebase-tools

# Install Java for Firebase Emulators
RUN apt-get update && apt-get install -y openjdk-17-jre

# Set up work directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application
COPY . .

# Expose Firebase Emulator ports
EXPOSE 4000 4400 4500 5001 8080 8085 9000 9099 9199 9299 9399

# Start emulators
CMD ["firebase", "emulators:start", "--project", "pho-viet-30d0b"]
