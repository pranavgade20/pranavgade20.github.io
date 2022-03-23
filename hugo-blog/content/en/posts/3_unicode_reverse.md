---
title: One weird hack to improve your browsing
date: 2021-12-11
description: Unicode and text rendering, and a life hack to make your browsing experience better
draft: false
hideToc: false
enableToc: true
enableTocContent: true
libraries:
- mermaid
tags:
- unicode
- tampermonkey
categories:
- unicode
---

Browsers are great. They make the Internet accessible, and parse weird-looking HTML into a beautiful document. However, organizing and looking for tabs in modern browsers is a mess. I often have quite a few tabs open from the same website, where the title is often something like `Website name - page name`. Now, although the website name *is* important, it takes up unnecessary space in the title of the page. So, the page name is usually rendered as `Website name - pa...`. This means that I have to cycle through a bunch of tabs until I find the `page name` I am looking for.

However, it doesn't have to be like this. We can trick the browser into reversing the way it renders the title. So, it will show `...ame - page name`, which gives enough information to find the page I'm looking for. Before we can get to how this can be done, we need to take a quick look at how text is rendered onto your screen.

### Text rendering

Although a LOT goes on when a simple character is rendered onto a screen with finite resolution(see https://learnopengl.com/In-Practice/Text-Rendering), our current concern is different. In particular, we want to trick the our renderer into rendering whatever characters we have from right-to-left instead of left-to-right. So, we can safely assume that we are dealing with bitmap fonts or something else that abstracts the rendering part away. However, we do want to look at how the text is arranged.

Different characters usually need to occupy different amounts of space. For example, ! occupies less space than _ does(in most non-monospace fonts). There's also a bunch of 'characters' that don't take up any space. For example, [zero-width space](https://en.wikipedia.org/wiki/Zero-width_space), a character used in typesetting doesn't take up any space. Going a step further, are there any characters that take *negative* space? There's [U+A80B](https://unicode-table.com/en/A80B/), an unicode character that you can repeat, and the next character [appears to the left](https://twitter.com/pranavgade20) of what was rendered before it. Unfortunately, this doesn't take us anywhere, because we can't use this to do anything meaningful with our usual ASCII characters.

However, there are certain characters that *have* to be written from right-to-left. For example, arabic is written from right to left. And sure enough, if we visit https://www.amazon.sa, we can see that the title is written from right-to-left, and the left is truncated if necessary. This is exactly what we want! This is basically a set of characters that have 'negative' width, or written from right to left. So, have we found the solution? Not quite, unless you can read the arabic script. So, we continue our search for a way to reverse the way ASCII is rendered. According to unicode, the following bidirectional classes are rendered right to left:
1. **right to left**: a bunch of non-ascii characters(for example, hebrew)
1. **right to left arabic**: like right to left, but for arabic
1. **right to left embedding**: does not override the direction of characters with strong directionality, like ASCII characters.
1. **right to left isolate**: at the time of writing, not supported by WebKit browsers
1. **right to left override**: strong override, causes text to be rendered right-to-left

So, the most promising candidate is the **right to left override(RLO)**, [U+202E](https://unicode-table.com/en/202E/). The following pargraph is the RLO character followed by "Hello, world":

{{< alert theme="info" >}}

&#8238; Hello, World

{{< /alert >}}

{{< expand "Try it yourself" >}}

You can try typing in this box to see how RLO affects text(type between ><): <input type="text" class="input" value="&#8238;><"><br>

{{< /expand >}}

So, we can simply reverse the string, and add [U+202E](https://unicode-table.com/en/202E/) to its beginning, and we should be good. Right? Unfortunately, this does not change the direction of rendering. So, even though everything is reversed, the right is truncated, unlike https://www.amazon.sa. So, the solution we have to use is the hackiest of them all: the **right to left arabic** bidirectional class has a curious little character: the [arabic letter mark U+061C](https://unicode-table.com/en/061C/). It looks like browsers only look at the first character in a string to determine the rendering/truncation dorection, probably as n optimization. So, we can simply add [U+061C](https://unicode-table.com/en/061C/) to the beginning of the title, and the rendering and truncation is done exactly as we want it!

### Tampermonkey

Although we have figured out what we need to do, going through the source inspector, finding the title tag, and modifying it manually is simply unacceptable. So, we use [tampermonkey](https://www.tampermonkey.net), a browser extension that allows us to write scripts that are executed on page loading and other events. It is basically a way to write micro-extensions without worriying about most stuff you need to worry about when making a full fledged extension.

We use the following script to add [U+061C](https://unicode-table.com/en/061C/) to the title whenever it is modified.

```javascript
// ==UserScript==
// @name         Title Fixer
// @namespace    https://pranavg.me/
// @version      1.1
// @description  make page titles look better
// @author       Pranav Gade
// @match        *://*/*
// @icon         https://www.google.com/s2/favicons?domain=mozilla.org
// ==/UserScript==

(function() {
    'use strict';
    let ch = '\u061C';
    new MutationObserver(function(mutations) {
        if (document.title[0] != ch) document.title = ch + document.title;
    }).observe(
        document.querySelector('title'),
        { subtree: true, characterData: true, childList: true }
    );
    if (document.title[0] != ch) document.title = ch + document.title;
})();
```

The MutationObserver adds the character to the title every time the title is changed, if our character isn't already there. We also add the character to the title once unconditionally(when the page is first loaded). The @match line in the comment tells tampermonkey which pages we want to run this script on. \*://\*/\* means we want to run it on all protocols, all domains, and all pages.

And that's it! Simply save the script and make sure it is enabled. You can now enjoy the superior experience of finding tabs quickly, and boost your productivity by some fraction of a percent!
