const dotenv = require("dotenv");
const htmlmin = require("html-minifier");
const emojiRegex = require("emoji-regex")();
const Image = require("@11ty/eleventy-img");
const emojiShortName = require("emoji-short-name");
const dateFns = require("date-fns");
const markdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");
const pluginToc = require("eleventy-plugin-toc");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const pluginRss = require("@11ty/eleventy-plugin-rss");
const faviconPlugin = require("eleventy-favicon");
const esbuild = require("esbuild");
const { sassPlugin } = require("esbuild-sass-plugin");

dotenv.config()

const isProd = process.env.NODE_ENV === "production";

const mdOptions = {
  html: true,
  breaks: false,
  linkify: false,
  typographer: false,
};

module.exports = (eleventyConfig) => {
  eleventyConfig.addWatchTarget("./src/**/*.scss");
  eleventyConfig.addWatchTarget("./src/**/*.ts");
  eleventyConfig.addPassthroughCopy({ "./src/_assets/fonts/**/*": "assets/fonts" });

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
      return content;
    });
  }

  eleventyConfig.setLibrary("md", markdownIt(mdOptions).use(markdownItAnchor));

  eleventyConfig.addPlugin(faviconPlugin, {
    destination: "./dist",
  });

  eleventyConfig.addPlugin(pluginRss);

  eleventyConfig.addPlugin(pluginToc, {
    tags: ["h2"],
  });

  eleventyConfig.addPlugin(syntaxHighlight);

  nunjucksFilters(eleventyConfig);

  eleventyConfig.on("eleventy.before", compileEsbuild);

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

  eleventyConfig.addNunjucksAsyncShortcode("image", imageShortcode);

  return eleventyConfig;
}

async function imageShortcode(src, alt, sizes, options = {}) {
  const metadata = await Image(src, {
    widths: [300, 600, 800, null],
    formats: ["avif", "jpeg"],
    outputDir: "./dist/assets/images/",
    urlPath: "/assets/images/",
  });

  let imageAttributes = {
    alt,
    sizes,
    loading: "lazy",
    decoding: "async",
    ...options,
  };

  return Image.generateHTML(metadata, imageAttributes, {
    whitespaceMode: "inline",
  });
}

function compileEsbuild() {
  return esbuild.build({
    entryPoints: {
      app: "./src/_assets/ts/index.ts",
      main: "./src/_assets/scss/index.scss",
    },
    outdir: "./dist/assets",
    minify: isProd,
    sourcemap: !isProd,
    bundle: true,
    platform: "browser",
    globalName: "App",
    plugins: [
      sassPlugin({
        loadPaths: ["node_modules"],
      }),
    ],
    define: Object.keys(process.env).reduce((acc, key) => {
      return Object.assign(acc, { ['process.env.' + key]: JSON.stringify(process.env[key]) });
    }, {})
  });
}
