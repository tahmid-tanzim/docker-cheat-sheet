# Use an existing docker image as a base
FROM node:16-alpine3.14

# Create a working directory & copy project files
WORKDIR /app
COPY package.json .

# Download and Install dependency
RUN yarn install
RUN rm -rf yarn.lock

COPY . .

# Tell the image what to do when it starts as a container
CMD ["npm", "start"]