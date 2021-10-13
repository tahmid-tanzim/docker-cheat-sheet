# Docker Cheat Sheet
Common commands on Docker and Kubernetes.

## 1. Manipulating Containers with the Docker Client
### Container Lifecycle
`docker run` = `docker create` + `docker start`
### Creating and Running a Container from an Image
Command Format - `docker run <image-name:tag> <command>`
```shell
$ docker pull busybox:stable
$ docker run busybox:stable echo Hello World, Tanzim!
$ docker run busybox:stable ping google.com
```
### List all running/stopped containers
```shell
$ docker ps
$ docker ps -a
```
### Restarting stopped container
```shell
$ docker start -a <container-id OR container-name>
```
### Remove all stopped containers
```shell
$ docker container prune
```
### Remove unused data
```shell
$ docker system prune
```
### Get logs from a container 
```shell
$ docker logs <container-id OR container-name>
```
### Stopping running containers
```shell
$ docker stop <container-id OR container-name>
$ docker kill <container-id OR container-name>
```
### Executing commands in running containers
```shell
$ docker exec -it <container-id OR container-name> <command>
# Executing commands one-time without interactive shell
$ docker exec <container-id OR container-name> <command>
$ docker run -it <image-name:tag> <sh||bash||zsh>
```
## 2. Building Custom Images Through Docker Server
### Building custom docker image from Dockerfile
```shell
$ docker build -t <docker-id/image-name:tag> .
$ docker run <docker-id/image-name:tag>
```
### Generate docker image manually
```shell
$ docker commit -c 'CMD["python", "manage.py", "runserver"]' <container-id OR container-name>
```
## 3. Making Real Projects with Docker
### Generate docker image manually
```shell
$ cd web-app
$ docker build -t oneleven/web-app:1.0.0 .
$ docker run --name node-app -p 3000:8080 -d oneleven/web-app:1.0.0
# Go to - http://localhost:3000
$ docker exec -it <container-id OR container-name> sh
```
## 4. Docker Compose with Multiple Local Containers
### Generate docker image manually
```shell
$ cd count-visits
$ docker-compose up --build
$ docker-compose up -d
$ docker-compose down
```
### Container Restart Policy
| Command        | Description                                                                                 |
|----------------|---------------------------------------------------------------------------------------------|
|`always`        | Always attempt to restart. Recommended for web application.                                 |
|`on-failure`    | Only restart if the container stops with an error code. Recommended for worker application. |
|`unless-stopped`| Always restart unless anyone forcibly stop it.                                              |








