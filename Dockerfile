# syntax = docker/dockerfile:1

# Adjust BUN_VERSION as desired
ARG BUN_VERSION=1.1.9
FROM oven/bun:${BUN_VERSION}-slim as base

LABEL fly_launch_runtime="Bun"

# Bun app lives here
WORKDIR /app

# Set production environment
ENV NODE_ENV="production"


# Throw-away build stage to reduce size of final image
FROM base as build

# Install packages needed to build node modules
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y build-essential pkg-config python-is-python3

# Install node modules
COPY --link bun.lockb package.json ./
RUN bun install --ci

# Migrate database
COPY --link migrate.ts drizzle.config.ts ./

# Copy all files in server/db/schema/
COPY --link server/db/schema/ ./

RUN bun migrate

# Install client node modules
COPY --link client/bun.lockb client/package.json ./client/
RUN cd client && bun install --ci

# Copy application code
COPY --link . .

# Change to client directory and build the client app
WORKDIR /app/client
RUN bun run build
# Remove all files in client except for the dist folder
RUN find . -mindepth 1 ! -regex '^./dist\(/.*\)?' -delete

# Final stage for app image
FROM base

# Copy built application
COPY --from=build /app /app

# Start the server by default, this can be overwritten at runtime
EXPOSE 3000
CMD [ "bun", "run", "start" ]
