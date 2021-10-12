---
title: How to update the Jest's jsdom to the latest version
date: "2019-07-29T11:12:00.000Z"
tags: ["jest", "jsdom", "react", "enzyme", "@testing-library"]
draft: false
---

Jest comes with jsdom to mount your components. When you mount your component with render libs like `@testing-library` or `enzyme`, this component will be mounted on jsdom.

[jsdom](https://github.com/jsdom/jsdom) is a JavaScript implementation of a "browser". It tries to implement both DOM and HTML standards capabilities to make sure you'll be able to mount and test your components like it was running in a browser.

Like your browser, you need to keep jsdom up-to-date to get the last implementations of it.

Unfortunately, Jest@24 comes with jsdom's 11 version for compatibility reasons:

> Note: Jest comes with JSDOM@11 by default. Due to JSDOM 12 and newer dropping support for Node 6, Jest is unable to upgrade for the time being.

At the time of writing this, jsdom is already on 15 version. There are lots of new features over the version 11.

For install the most recent version, all you have to do is:

* Install the most recent jsdom environment:

```bash
yarn add jest-environment-jsdom-fifteen --dev
```

* Configure Jest to use it. In in your `jest.config.js`:

```js
{
  testEnvironment: 'jest-environment-jsdom-fifteen'
}
```
