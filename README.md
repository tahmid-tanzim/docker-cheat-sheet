# Docker Cheat Sheet
Common commands on Docker and Kubernetes.

## 1. Manipulating Containers with the Docker Client
### Container Lifecycle
`docker run` = `docker create` + `docker start`
### Creating and Running a Container from an Image
Command Format - `docker run <image-name:varsion> <command>`
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
$ docker run -it <image-name:varsion> <sh||bash||zsh>
```
## 2. Building Custom Images Through Docker Server
