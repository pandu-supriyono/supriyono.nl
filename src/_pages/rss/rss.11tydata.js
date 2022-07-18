module.exports = {
  eleventyComputed: {
    metadata: (data) => {
      const { site } = data
      return {
        title: site.name,
        subtitle: site.description,
        langauge: site.language,
        url: site.url,
        author: {
          name: site.author,
          email: site.email
        }
      }
    }
  }
}
