# Use official Node.js image as the base

# Use a Node image with build tools for native dependencies
FROM node:20-alpine as builder

# Install Python and build tools for node-gyp
RUN apk add --no-cache python3 make g++

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package.json package-lock.json* ./
RUN npm ci --prefer-offline --no-audit

# Copy the rest of the app
COPY . .

# Build the Next.js app
RUN npm run build

# Production image, copy only necessary files

# Use a Node image with build tools for native dependencies
FROM node:20-alpine as runner

# Install Python and build tools for node-gyp
RUN apk add --no-cache python3 make g++
WORKDIR /app

ENV NODE_ENV=production

# Install production dependencies only
COPY package.json package-lock.json* ./
RUN npm ci --only=production --prefer-offline --no-audit

# Copy built app and public assets from builder
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.mjs ./next.config.mjs
COPY --from=builder /app/package.json ./package.json

# Expose port 3000
EXPOSE 3000

# Start the Next.js app
CMD ["npx", "next", "start"]
