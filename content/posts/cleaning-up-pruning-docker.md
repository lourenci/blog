---
title: "Cleaning up not-used Docker images/containers/volumes"
date: 2022-04-27T18:10:06+1000
tags:
- TIL
- docker
draft: false
---
Docker has a built-in command to prune all the dangling (not-used) Docker images/containers/volumes:
```bash
docker system prune --volumes
```
