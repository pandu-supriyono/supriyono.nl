---
layout: blog-list.njk
pagination:
  data: collections
  size: 1
  alias: tag
  filter:
    - all
    - post
    - posts
    - tagList
permalink: /blog/tags/{{ tag | slugify }}/
tag: tag
eleventyComputed:
  title: Posts about {{ tag }}
---

[Return to all blog posts](/blog)
