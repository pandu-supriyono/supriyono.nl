---
title: How this website is built and managed
date: 2022-07-17
tags:
  - Eleventy
  - Web performance
description: Recently I relaunched my website, mostly because I felt like a new project.
  In this article I'll go over how my website is setup and how I manage it.
---

## Simple websites

I love simple websites. To me, simple websites are websites that are engineered sufficiently
and minimally for what the website needs to do. It does what it needs to do, and it does it well.
Such websites are fast, accessible and robust. Often this means that there aren't many complicated
things going on: the website works fine without JavaScript (although it can be enhanced using it) and
makes use of standardized features that are built-in with the browser. It doesn't try to micro-manage
its user experience, but embraces the diversity and flexibility of how people actually use websites.

In my opinion, lots of websites nowadays are overengineered. I don't think a simple blog website needs
something like React or Vue. Don't get me wrong -- these advanced JavaScript tools are awesome, but
were engineered to solve problems and edge cases that large web projects have, but not the average website.

Lightweight, however, does not mean "boring". It also doesn't necessarily mean that it uses minimal tooling.
My goal with this website was to make a pretty, simple, blazingly fast&#8482; and accessible website built with
modern tools.

## The stack

- Eleventy
- Webpack
- SASS
- TypeScript
- Netlify Edge Functions

That's it. Eleventy allows me to output my code into a simple, static website that would work without JavaScript. 
The edge allows me to cheat my way into server-side functionality into my otherwise static website.

### Eleventy

Eleventy is a Node.JS based static site generator (SSG) similar to Hugo or Jekyll. I have used it frequently in recent
projects, such as the static website of [the Embassy of the Republic of Indonesia in The Hague](https://indonesia.nl).
Eleventy is extremely configurable and extensible, yet already works perfectly with minimal configuration. The documentation
is excellent and the community thriving and friendly.

### Webpack

Although not necessary, the extensibility of Eleventy allows me to plugin Webpack to compile and optimize my assets.
You may associate Webpack with JavaScript-heavy apps, but I use it because I am used to controlling how my assets
are processed using Webpack and still manage to push a very static website. It's a little overkill for my needs,
so I may look for other solutions if I find it to be too tedious to maintain in the future.

### SASS

Also a thing I use due to comfort. I am considering switching to PostCSS to replace SASS, but I am too used to 
SASS tooling at the moment 😊. In any case, I make lots of use of CSS [custom properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties) since I am very confident about its browser support and I now find it to require less boilerplate than setting up
SASS mixins to achieve the same things that custom properties can.

### TypeScript

Ensures type safety and helps me minimize bugs in my code.

### Netlify Edge Functions

This is actually the first website in which I use the so-called Edge (or serverless to begin with) to complement a website.
Although I also wanted to see what the hype is about, I saw that I can provide some useful server-side functionality to my users' experiences.
For example, I use it to respect a user's wish to save internet data using the [Save-Data header](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Save-Data), or to render the website in dark or light mode from the server.

## Site Management

How I manage the site is even simpler. I just use Markdown in the same project
as the website's source code and push to Git. Eleventy processes this into an
HTML template and manages the permalinks for me. Netlify automatically rebuilds
the website once it detected a push to the production branch.

You can view the [source code to this website on GitHub](https://github.com/pandu-supriyono/site).

