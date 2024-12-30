const postcssImport = require('postcss-import');

module.exports = {
  webpack: (config, env) => {
    // Add postcss-import to the PostCSS plugins
    const postcssLoader = config.module.rules.find(
      (rule) => rule.test && rule.test.toString().includes('postcss')
    );

    if (postcssLoader) {
      postcssLoader.use.push(postcssImport());
    }

    return config;
  }
};
