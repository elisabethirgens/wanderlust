module.exports = (eleventyConfig) => {
  eleventyConfig.addPassthroughCopy("main.css");
  eleventyConfig.addPassthroughCopy("test-data.json");
  eleventyConfig.addPassthroughCopy("script.js");
};
