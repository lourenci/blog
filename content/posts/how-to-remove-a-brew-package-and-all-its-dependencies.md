---
title: How to remove a Brew package and all its dependencies?
date: 2021-10-14T08:47:14-03:00
tags:
	- TIL
	- brew
draft: true
---

TIL You can use the `autoremove` command to remove the leftovers from a package previously installed by brew.

* List all the installed packages:

```bash
brew leaves
```

* Remove an installed package:

```bash
brew uninstall [package]
```

* Remove all the leftovers from an uninstalled package:

```bash
brew autoremove
```

When executing this command, pay attention to `stdout`. Brew does not clear some files left from the `autoremove` command and it warnings you about that.
