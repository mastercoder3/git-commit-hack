FROM node:16.17.1-alpine
#FROM node:lts-alpine
LABEL maintainer <muhammadjunaidhassan1@gmail.com>

# Set the working directory
WORKDIR /app

# Copy project specification and dependencies lock files
COPY package*.json ./
RUN apk add --no-cache alpine-conf

RUN npm install

# Copy app sources
COPY . .

CMD ["npm", "start"]

