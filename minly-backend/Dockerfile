# Step 1: Use an official Node.js image as a base image
FROM node:18 AS build

# Step 2: Set the working directory in the container
WORKDIR /app

# Step 3: Copy the package.json and package-lock.json (or yarn.lock) files to install dependencies first
COPY package*.json ./

# Step 4: Install dependencies (this ensures Docker caches dependencies unless package.json changes)
RUN npm install --frozen-lockfile

# Step 5: Copy the rest of the project files into the container
COPY . .

# Step 6: Build the NestJS project (creates dist/ directory)
RUN npm run build

# Step 7: Start a new image for the final production build
FROM node:18 AS production

# Step 8: Set the working directory in the container
WORKDIR /app

# Step 9: Copy over the built files from the build image (dist and package.json)
COPY --from=build /app/dist /app/dist
COPY --from=build /app/package*.json /app/

# Step 10: Install production dependencies (we skip dev dependencies)
RUN npm install --only=production --frozen-lockfile

# Step 11: Expose the port your app will run on (e.g., 3000)
EXPOSE 3000

# Step 12: Run the NestJS app
CMD ["node", "dist/main"]