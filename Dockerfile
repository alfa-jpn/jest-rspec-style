FROM node:12-alpine

#
# Build arguments.
#
ARG NODE_ENV='test'

#
# Environment variables.
#
ENV NODE_ENV ${NODE_ENV}

#
# Create working directory.
#
RUN mkdir /app
WORKDIR /app

#
# Install modules.
#
ADD package.json /app/package.json
ADD package-lock.json /app/package-lock.json
RUN npm install

#
# Put appliation.
#
ADD . /app

#
# Set default command.
#
CMD ["npm", "test:watch"]
