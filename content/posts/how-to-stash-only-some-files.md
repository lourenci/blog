---
title: How to stash only some files?
date: 2022-07-14T19:25:51+1000
tags:
- TIL
- GIT
draft: false
---
Since [Git 2.13](https://github.com/git/git/compare/ae900ebd71b58c12356674228ce99e6673da3dec...9e140909f611fff720efc914b7186b8e4ab722cd), we're able to stash only some specific files from your working tree. 🙏🏻

In order to do that:

```bash
git stash [--patch] -- {files...} # or
git stash push [--patch] {files...}
```
