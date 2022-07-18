const webpack = require("webpack");
const htmlmin = require("html-minifier");
const emojiRegex = require("emoji-regex")();
const emojiShortName = require("emoji-short-name");
const dateFns = require("date-fns");
const markdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");
const pluginToc = require("eleventy-plugin-toc");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const pluginRss = require("@11ty/eleventy-plugin-rss");
const faviconPlugin = require("eleventy-favicon");

const isProd = process.NODE_ENV === "production";

const mdOptions = {
  html: true,
  breaks: false,
  linkify: false,
  typographer: false,
};
const mdAnchorOpts = {
  permalink: true,
  permalinkClass: "anchor-link",
  level: [1, 2, 3, 4],
  visuallyHiddenClass: "sr-only",
};
module.exports = (eleventyConfig) => {
  eleventyConfig.addWatchTarget("./src/**/*.scss");
  eleventyConfig.addWatchTarget("./src/**/*.ts");

  const webpackConfig = isProd
    ? require("./webpack.config.prod")
    : require("./webpack.config.dev");
  const webpackCompiler = webpack(webpackConfig);

  if (isProd) {
    eleventyConfig.addTransform("htmlmin", function (content, outputPath) {
      if (outputPath && outputPath.endsWith(".html")) {
        let minified = htmlmin.minify(content, {
          useShortDoctype: true,
          removeComments: true,
          collapseWhitespace: true,
        });
        return minified;
      }
      return content
    })
  }

  eleventyConfig.setLibrary("md", markdownIt(mdOptions).use(markdownItAnchor));

  eleventyConfig.addPlugin(faviconPlugin, {
    destination: "./dist"
  });

  eleventyConfig.addPlugin(pluginRss);

  eleventyConfig.addPlugin(pluginToc, {
    tags: ["h2"],
  });

  eleventyConfig.addPlugin(syntaxHighlight);

  nunjucksFilters(eleventyConfig);

  eleventyConfig.on("eleventy.before", () => {
    webpackCompiler.run((err) => {
      console.log("Compiling webpack...");
      if (err) throw err;

      webpackCompiler.close((closeErr) => {
        if (closeErr) throw closeErr;
      });
    });
  });

  eleventyConfig.addTransform("emojis", (content, outputPath) => {
    return outputPath.endsWith(".html") ? wrapEmojis(content) : content;
  });

  eleventyConfig.addCollection("posts", (collectionApi) => {
    return collectionApi
      .getFilteredByGlob("./src/_posts/*.md")
      .sort((a, b) => b.date - a.date);
  });

  return {
    markdownTemplateEngine: "njk",
    dir: {
      input: "src",
      includes: "_includes",
      layouts: "_layouts",
      output: "dist",
    },
  };
};

function wrapEmojis(content) {
  return content.replace(emojiRegex, wrapEmoji);
}

function wrapEmoji(emoji) {
  const label = emojiShortName[emoji];

  return label
    ? `<span role="img" aria-label="${label}" title="${label}">${emoji}</span>`
    : emoji;
}

function nunjucksFilters(eleventyConfig) {
  eleventyConfig.addFilter("date", (date, format = "yyyy/MM/d") => {
    return dateFns.format(date, format);
  });

  eleventyConfig.addFilter("dateToRfc3339", pluginRss.dateToRfc3339);

  eleventyConfig.addFilter("dump", (obj) => JSON.stringify(obj));

  return eleventyConfig;
}
