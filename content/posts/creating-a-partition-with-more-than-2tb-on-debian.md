---
title: Creating a partition with more than 2TB on Debian
date: 2023-02-28T20:01:10+1100
tags:
  - linux
draft: false
---

Debian (`fdisk`) doesn't support creating a partition with more than 2TB due to using the MBR partition table. You'll need to use GPT instead:

```sh
sudo apt-get install parted

# Check the disk you want to format
sudo fdisk -l

# Replace /sdx for the disk you want to format
sudo parted /dev/sdx
mklabel gpt
quit
sudo parted -a optimal /dev/sdx mkpart primary '0%' '100%'
```

Now you can format the partition with the file system you want:

```sh
sudo mkfs.ext4 /dev/sdx1
```

You should be able to replace the `mkfs.ext4` command with `mkfs.exfat` if you want that file system (see [section below](#which-partition-type-to-choose))

## Which partition type to choose?

As a rule of thumb:

- Use `ext4` if you plan to use the disk only on linux.
- Use `exFAT` if you plan to share between multiples OS. Linux, Windows and MacOS support it.

Debian out-the-box does not support `exFAT`. You'll need to install fuse:

```sh
sudo apt-get install exfat-fuse exfat-utils
```
