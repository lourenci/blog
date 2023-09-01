---
title: How to backup and restore Docker volumes
date: 2023-09-01T10:31:52+1000
draft: false
---

Recently, I had to update a major version of Debian. [One of their "before starting updating" steps is to remove all non-Debian installed packages](https://www.debian.org/releases/stable/amd64/release-notes/ch-upgrading.en.html#removing-non-debian-packages). Docker is one of them. Uninstalling Docker is as simple as `$ sudo apt-get purge docker` if I was not relying heavily on external volumes.

But, it turns out backup-ing an external volume is very straightforward:

```sh
# Backup the output command's path
docker volume inspect {volume} | jq -r ".[].Mountpoint"

# You can use tar for that
tar czf backup.tar.gz {mount-point}
```

Once you have Docker installed again, all you need to do is copy the backup file to the new Docker volume:

```sh
# Create your new volume
docker volume create {volume}

# Get the new volume's path
docker volume inspect {volume} | jq -r ".[].Mountpoint"

# You can use tar for that
tar xf backup.tar.gz --directory={mount-point}
```
