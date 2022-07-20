module.exports = {
  layout: 'post.njk',
  permalink: '/blog/{{ page.date | date }}/{{ page.fileSlug }}/',
  eleventyComputed: {
    author: (data) => data.site.author
  }
}
