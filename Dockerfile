# Use official Node.js image as the base
FROM node:20-alpine as builder

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
FROM node:20-alpine as runner
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
