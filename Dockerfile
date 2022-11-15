# Installs Node.js image
FROM node:16.13.1-alpine3.14
ENV NODE_ENV=development

# sets the working directory for any RUN, CMD, COPY command
# all files we put in the Docker container running the server will be in /usr/src/app (e.g. /usr/src/app/package.json)
WORKDIR /app

# Copies package.json, package-lock.json, tsconfig.json, .env to the root of WORKDIR
COPY ["package.json", "package-lock.json", "tsconfig.json", ".env", "./"]
COPY src ./src
# Installs all packages

COPY . .

RUN npm install
RUN npm install db-migrate-pg
