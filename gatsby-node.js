/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
// const ExtractTextPlugin = require('extract-text-webpack-plugin')
// const path = require('path')
// var cssModulesConfig = require('gatsby-1-config-css-modules')
exports.modifyWebpackConfig = ({ config, stage }) => {
  // TODO: fix Tailwind postCSS integration...
  // Hopefully this makes Tailwind.css work during development...
  // if (stage === 'develop') {
  //   config.merge({
  //     postcss: [require('tailwindcss')('./src/styles/tailwind.js')]
  //   })
  //   return config
  // }

  // Ignore NPM packages that cause build errors
  if (stage === 'build-html') {
    config.loader('null', {
      test: /isotope-layout|scrollreveal/,
      loader: 'null-loader'
    })
  }

  // TODO: fix Tailwind postCSS integration...
  // Hopefully this makes Tailwind.css work during the build...
  // if (stage === 'build-css') {
  //   config.merge({
  //     postcss: [require('tailwindcss')('./tailwind.js')]
  //   })
  // }

  // TODO: need this line (some docs pages include it, some don't)?
  return config
}
