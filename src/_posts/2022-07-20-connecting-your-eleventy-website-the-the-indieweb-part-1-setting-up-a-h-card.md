---
title: "Connecting your Eleventy website with the IndieWeb part 1: Setting up a h-card"
date: 2022-07-20
tags:
  - Eleventy
  - JavaScript
description: In this series, I show how to take ownership of your online personality by connecting your Eleventy website to the IndieWeb.
---

## Throwback to the old days of the web

In the early 2000s, my sister taught me some HTML to create a [Yahoo! GeoCities
website](https://en.wikipedia.org/wiki/Yahoo!_GeoCities). That was my entry into
the world of web as a 8 year old kid. I loved copying HTML snippets to embed fun
little animations onto my website and build my own personalized online space (I
changed a lot since then, now I mostly copy JavaScript snippets). It felt as if
the web was filled with websites like mine back then. A diverse cluter of
simple, independent and personal websites.

We've lost this independent feeling on the web. Everything is now part of some
larger (social media/advertising) platform. We have personal profiles, but
wrapped in an advertising machine in which all our online interactions are
logged so that it can feed algorithms designed to manipulate us to our core. It
has changed our society online and offline.

One things you can do to retake control of your web content by putting it on your own
website and hooking up to a (social) network (not to be confused with social media) using
protocols that allow you to be part of (the IndieWeb community)[https://indieweb.org/].
I won't go into details about the IndieWeb here; I encourage you to check out the community
website.

In this series of tutorials, we'll go over how to connect your [Eleventy
website](https://www.11ty.dev/) to the IndieWeb while keeping your code clean
and maintainable. In this first part, we'll set up an h-card: an element marked up
so that an IndieWeb parser can parse data about you. Call it an online business card.

## Prerequisites

I assume you meet several prerequisites before continuing:

- You have an Eleventy-based website (or are planning to make one)
- You have a general idea of what the IndieWeb is and how it works

## Setting up data for your h-card

To provide authorship information (as well as to identify yourself on the web),
you should provide some basic information, such as your name, website URL and
other optional details. You should then

To create a single source of truth for this information,
we can create a [global data file](https://www.11ty.dev/docs/data-global/).
Let's create a file called `site.js` in your `_data` directory. Replace the values with your own information.

```js
module.exports = () => {
  return {
    author: "Pandu Supriyono",
    url: "https://supriyono.nl",
    email: "mail@supriyono.nl",
    photo: "https://supriyono.nl/assets/images/pandu-portrait.jpeg",
  };
};
```

You can [see a full list of structured details that you can provide on the specification](https://microformats.org/wiki/h-card).

## Creating the h-card markup

To seperate your website's elements, create a new file called `h-card.njk` (or other templating extension that you use for Eleventy)
in your includes directory (`_includes` by default).

```liquid
<div class="h-card">
  <span class="p-name">{{ '{{site.name}}' }}</span>
  <a href="{{ '{{site.url}}' }}" class="u-url">{{ '{{site.url}}' }}</span>
  <a href="mailto:{{ '{{site.email}}' }}" class="u-email">{{ '{{site.email}}' }}</span>
  <img src="{{ '{{site.photo}}' }}" class="u-photo" />
</div>
```

Once you have the include, go to the template of your home page and include the partial anywhere you'd like within the body.
How you do this depends on the templating engine you use.

```liquid
{{ '{% include "h-card.njk" %}' | safe }}
```

In your CSS, you can hide the h-card so that people don't see or hear it (if using a screen reader).

```css
.h-card {
  display: none;
  visibility: hidden;
}
```

That's it! You are done with the first step and you are already compliant with the h-card format.

## What you can do next

Another step you can take is to [add a rel="me" attribute](https://indieweb.org/rel-me) to all links in your website that lead to your other
internet profiles (for example, your Twitter profile).

I like to keep a single source of truth for my internet profiles as well, so I add the following to my `_site.js` file:

```js
module.exports = () => {
  return {
    // ... Previously added details ...
    profiles: [
      {
        name: "GitHub",
        href: "https://github.com/pandu-supriyono",
      },
      {
        name: "Twitter",
        href: "https://twitter.com/pandu_yono",
      },
    ],
  };
};
```

Then somewhere in my template where I want to show my online profiles:

```liquid
{{ '{% for social in site.profiles %}
  <a href="{{ social.href }}" rel="me">{{ social.name }}</a>
{% endfor %}' | safe }}
```

Now you tell parsers that the link will lead the user to a destination that represents a profile of the same person -- you!

In the next part of this series, we'll look at how we can connect your blog posts to the IndieWeb. Thanks for reading and see you soon 👋🏽!
