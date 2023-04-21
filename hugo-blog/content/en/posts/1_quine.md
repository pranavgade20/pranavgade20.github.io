---
title: A HTML Quine
date: 2020-02-14
description: An explaination of how the HTML quine on my website works
draft: false
hideToc: false
enableToc: true
enableTocContent: true
tags:
- quine
categories:
- html
---

## Background

A quine is a program that produces its source code as its output. Now, although HTML is not a programming language, but a markup language, [CSS is a turing complete](https://stackoverflow.com/questions/2497146/is-css-turing-complete) language as long as you consider the accompanying HTML as well. So, this is technically a description of a HTML+CSS quine, but I think saying HTML is sufficient.

I was introduced to the idea of a quine in the book Gödel, Escher, Bach: An Eternal Golden Braid, by Douglas Hofstadter. After I stumbled across this [this](https://youtu.be/gdSlcxxYAA8) talk, I thought it would be a nice way to put up information about me, because I am lazy and suck at design. Surprisingly, this is a very straightforward quine, so here are more details.

## The quine

The magic we use here is all thanks to the `::before` and `::after` CSS selectors. If you are new to CSS, selectors are basically a way to select specific elements so that we can change their properties like font style, color, etc. So, `p::before` will select the element that precedes the paragraph tag in our HTML document, and allow us to insert whatever we want in there. For example, `<p>`! Because we want to convert `<p> Hello, World! </p>` which renders as `Hello, World!` to `<p> Hello, World!`, this is the perfect solution. So, let us start writing the CSS step by step:

{{< highlight CSS>}}

p::before{content:'<p>'}

{{< /highlight >}}

This adds a `<p>` before all paragraph elements. Similarly, we can add the `::after` selector.

{{< highlight CSS>}}

p::before{content:'<p>'} p::after{content:'</p>'}

{{< /highlight >}}

Now, all our paragraphs are surrounded with the appropriate HTML tags. However, our HTML page has a number of other tags. We can simply do the same thing for them:

{{< highlight CSS>}}

html::before{content:'<html>'} html::after{content:'</html>'}
head::before{content:'<head>'} head::after{content:'</head>'}
title::before{content:'<title>'} title::after{content:'</title>'}
body::before{content:'<body>'} body::after{content:'</body>'}
h1::before{content:'<h1>'} h1::after{content:'</h1>'}
h3::before{content:'<h3>'} h3::after{content:'</h3>'}
h5::before{content:'<h5>'} h5::after{content:'</h5>'}
p::before{content:'<p>'} p::after{content:'</p>'}
table::before{content:'<table>'} table::after{content:'</table>'}
tr::before{content:'<tr>'} tr::after{content:'</tr>'}
td::before{content:'<td>';} td::after{content:'</td>';}

{{< /highlight >}}

It has been straightforward so far. However, there are a couple of minor issues. First, the `<meta>` tag. It does not have a closing tag, as everything is inside the tag as an attribute. The solution here is pretty straightforward: include the entire tag with the attributes in the `::before` selector. So, we can have this for the meta tag:

{{< highlight CSS>}}

meta::before{content:'<meta charset="utf-8" name="viewport" content="width=device-width, initial-scale=1">'}

{{< /highlight >}}

Our second problem is the `<a>` tags, as they have hrefs which are different in different places. thankfully, CSS has an `attr()` function that gives us the value of the attribute(in out case, href). So, we can use the following CSS for dealing with hyperlinks:

{{< highlight CSS>}}

a[href]::before{content: "a href='" attr(href) "'>"} a::after{content:'</a>'} a{display:inline; text-decoration: none}

{{< /highlight >}}

We used [href] to make sure we select the correct `<a>` tags, and the `display:inline` is just for formatting(more on this later). `text-decoration:none` removes the underlines from the hyperlinks.

The final challenge is `<style>` tags. Specifically, the content in the `::after` selector. Because we are using style tags to enclose this CSS, if we use `style::after{content:'</style>'}`, the `</style>` is interpreted as a closing tag, which is not something we want to see happening. Thankfully, just escaping the slash solves our problem, and we get the following CSS for dealing with the style tags:

{{< highlight CSS>}}

style::before{content:'<style>'} style::after{content:'<\/style>'}

{{< /highlight >}}

Although you can see `<style></style>` now, the CSS we wrote in the document is missing. This bring us to arguably the most important piece of CSS in the document:

{{< highlight CSS>}}

*{display:block}

{{< /highlight >}}

This makes the CSS we have written in the document visible. Now, we have a stylesheet with the surrounding tags. This is also the reason we need the `display:inline` in the `<a>` tags, as `display:block` makes the text go on a new line, which doesn't look particularly nice.

Our page is now technically a quine, and if you copy-paste the output of the HTML into a HTML, you should get the same HTML(yes, it does get somewhat confusing). However, this looks a bit bland. So, we sprinkle some CSS magic to format the different elements:

{{< highlight CSS>}}

html{max-width:99ch; padding:1ch; margin:auto; color:#333; font-size:1.2em}
style{font-size: 0.4em}
*::before, *::after{color:#aebfd0; font-weight:100; font-size:0.8em; margin:0.3em}
*{display:block; font-family:Monospace}

{{< /highlight >}}

We finally have the result: a HTML that generates itself on most modern browsers. You can visit the final version at [pranavgade20.github.io](https://pranavgade20.github.io). Finally, a caveat: you need to print the page and copy the text from there, as the `::before` and `::after` selectors' content cannot be selected if you drag over them, because someone might want to copy the text without formatting. This is obviously not a bug and definitely a feature :)
