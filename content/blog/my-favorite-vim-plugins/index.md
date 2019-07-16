---
title: My Favorite Vim Plugins
date: "2019-07-16T23:22:03.284Z"
tags: ["vim", "vim-plugins"]
---

It had been a long time using a heavy IDE from the Jetbrains family (eg. PhpStorm, Rubymine) and I wanted to switch to something lightful and as keyboard oriented as Jetbrains' IDEs. I tried VSCode, but the lack of essential shortcuts (eg. navigate through the tree files) was the last straw for me. So, I decided to adventure in the Vim world.

I started in the Vim world without any Vim bootstrap generator, I wanted to start by the Vim way and going to include some plugins as needed.
I knew I'll end up with a lot of plugins, but I really wanted to miss a feature in Vim before to include it through a plugin. I think this is the best way to really understand and learn Vim.

Now, after a year of daily usage of Vim for Web development (JS and Ruby primarly), I really end up with a list of plugins and I want to share with you some of my favorite ones and how I use them in my development routine.

You can see the full list on my [github](https://github.com/lourenci/dotfiles/blob/master/vim/vim.symlink/plugin/plugins.vim).
None of them change the way the Vim works (there is only one exception), I try very hard to avoid these kind of plugins (eg. vim-targets adds a very nice list of text objects, but some of them, changes the behaviour of the existing ones).

The below list isn't in any particular order.

### [junegunn/fzf.vim](https://github.com/junegunn/fzf.vim)

For those who don't know what fzf is, it's a command-line fuzzy where basically you can pass any list to it and it will filter (using fuzzy) that list while you typing.

This plugin provides a lot of "lists" to send to fzf.

I use some of those "lists" mapped in my Vim:

* `:fzf`

A list of every file in your project.

* `:GFiles?`

A list of every git dirty file in your project.

* `:BTags`

A list of every buffer's tags.

* `:History`

The MRU (most recent used) files.

* `:Buffers`

All the buffers opened.

* `:Ag`

In file project-wide search.

### [tpope/vim-surround](https://github.com/tpope/vim-surround)

Tim Pope is famous by your Vim plugins. There are a lot of plugins out there made by him. Any vimmer propably use some of them.

Surround is a plugin that adds some text objects to Vim. If you don't know what text objects are, [I recommend you to read about it](https://blog.carbonfive.com/2011/10/17/vim-text-objects-the-definitive-guide/).

In a nutshell, with Surround, you can "surround" any text with `()` or `[]` or `{}` (or a lot more) with some keystrokes.

### [michaeljsmith/vim-indent-object](https://github.com/michaeljsmith/vim-indent-object)

This one add a text object by the identation of your code/text. You can delete, change, select, do any action with a block of code with some keystrokes.

### [tpope/vim-fugitive](https://github.com/tpope/vim-fugitive)

Another must have by Tim Pope. Fugitive is a plugin that allows you to work with git in Vim. You can execute basically any git command in Vim. In my daily usage, I use only a few commands though:

* `:Gread`

It is the same to `git checkout [file]`.

* `:Gwrite`

It is the same to `git add [file]`.

* `:Gdiff`

It opens a vim-diff with the buffer changes relative to the HEAD.

* `:Gblame`

To blame your cowork.

### [mbbill/undotree](https://github.com/mbbill/undotree)

Any change to the buffer file is kept by the Vim, you can view it with the `:undolist` command.

Undotree gives you a tree view with the buffer changes where you can navigate through them.

I really recommend you to set the persistent undo: all the changes are always kept by the Vim, even when you close it.
You can activate the persistent undo in your dotfile:
```
set undodir=~/.vim/undo/
set undofile
```

### [junegunn/vim-peekaboo](https://github.com/junegunn/vim-peekaboo)

Vim has a concept of registers. Basically, when you copy a text that text goes to a fixed register. You can copy a text to a specific register and use it after accessing that register. A macro goes to a register. The last search goes to another register...

When you press a key that waits for a register, Peekaboo will automatically open a unobtrusive splitted window with all registers and its content.

### [janko-m/vim-test](https://github.com/janko/vim-test/)

I make a lot of tests in my day. With vim-test, I can go to a specified spec's context and run it with the `:TestNearest` command. Vim-test will automatically detect my test IDE and run only that context on that IDE. It's beaultiful.

I've some commands mapped in my Vim:

* `:TestNearest`

It runs the context where your cursor is over.

* `:TestFile`

It runs the entire test file.

* `:TestLast`

It runs the last executed test.

This is very useful, you can run a specific context and goes to the code to make that context to be green. You can run the last test without head over to it, directly in the code.

* `:TestVisit`

It heads your over to the last executed test.

### [nelstrom/vim-visual-star-search](https://github.com/nelstrom/vim-visual-star-search)

I said earlier that I don't like plugins that change the Vim way, its behaviour of working. This plugin is the exception.

I can't understand why the Vim doesn't do this by default. When you visual select a text and press the `*` (or `#`), Vim'll search for the word where the cursor is over. With this plugin, you change the Vim behaviour to find by the entire selected text.

### [neoclide/coc.nvim](https://github.com/neoclide/coc.nvim)

Coc is the best auto complete for Vim out there. First, it simple works: easy to install it and easy to update it. Second, it has full LSP support. Third, it's very extensible.

The source for the auto complete is powered by the extensions that you have to install in Coc. I've removed a few plugins with these extensions. I don't need more Ale. I don't need more vim-gitgutter...

Some commands I've mapped in my Vim:

* `<Plug>(coc-rename)`

It renames a method or a var. As Coc has support to LSP, it can rename even when the var is on another buffer.

* `<Plug>(coc-definition)`

It goes to the method definition wherever it's.

Some extensions that I use:

* coc-tsserver

Intellisense for Javascript and Typescript.

* coc-eslint

It runs eslint on buffer file and can run `--fix` on it on save.

* coc-html

For html.

* coc-solargraph

For ruby.

* coc-git

It substitutes the vim-gitgutter and add some git capabilities that support vim-fugitive.
With some mapped commands, I can diff a chunk, I can undo a chunk, I can see the git history of a buffer file and diff it with the local, I can go to the next or previous change...

* coc-tabnine

For tabnine.
[TabNine](https://tabnine.com/) is a kind of intellisense with AI. It doesn't complete only methods or vars, It completes all the expression. It's very hard to live without it once you get the hang of it.

### BONUS: [Github colorscheme](https://github.com/cormacrelf/vim-colors-github)

Don't judge me, I use light theme. I think it's less stressful for my eyes because I can use it with less display brightness than dark themes and it reduces the light reflection on my screen.

I think that a colorscheme must have a nice soft fold color and it has to take care of the diff colors. I have to see the diff and imediatelly spot what is going on in my code. This colorscheme has these very well implemented.
