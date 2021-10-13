# Use an existing docker image as a base
FROM alpine:3.14.2

# Download and Install dependency
RUN apk add --update redis

# Tell the image what to do when it starts as a container
 CMD ["redis-server"]