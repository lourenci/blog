---
title: How to wrap long lines when writing markdown on Vim
date: "2019-07-21T14:17:00.000Z"
tags: ["vim", "markdown"]
---

If you have Vim optimized for coding, probably you've problem for writing on it. The first one that comes out for me as soon as I started to writing markdown on Vim was the word wrap question, any sentence comes longer easily and you can't read it anymore if you have set Vim to not wrap your code.

If you want to configure your Vim to wrap long lines only in markdown files, all you have to do is to configure this on your dotfile:

```vim
au BufRead,BufNewFile *.md setlocal wrap
```

What this magic command do is: when either opening or creating a markdown file, set the `wrap` command only for this buffer.
