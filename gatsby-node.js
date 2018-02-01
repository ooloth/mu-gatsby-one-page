/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// const ExtractTextPlugin = require('extract-text-webpack-plugin')
// const path = require('path')
// var cssModulesConfig = require('gatsby-1-config-css-modules')
// var extractTextWebpackPlugin = require('extract-text-webpack-plugin')

// exports.modifyWebpackConfig = ({ config, stage }) => {
//   // TODO: fix Tailwind postCSS integration...
//   // Hopefully this makes Tailwind.css work during development...
//   // if (stage === 'develop') {
//   //   config.merge({
//   //     postcss: [require('tailwindcss')('./src/styles/tailwind.js')]
//   //   })
//   //   return config
//   // }

//   // Ignore NPM packages that cause build errors
//   if (stage === 'build-html') {
//     config.loader('null', {
//       test: /isotope-layout|scrollreveal/,
//       loader: 'null-loader'
//     })
//   }

//   // TODO: fix Tailwind postCSS integration...
//   // Hopefully this makes Tailwind.css work during the build...
//   // if (stage === 'build-css') {
//   //   config.merge({
//   //     postcss: [require('tailwindcss')('./tailwind.js')]
//   //   })
//   // }

//   // Remove grid from autoprefixer
//   // see: https://github.com/gatsbyjs/gatsby/issues/318#issuecomment-357272207
//   config.merge({
//     postcss(wp) {
//       return [
//         require('postcss-cssnext')({ browsers: ['last 2 versions', '> 2%', 'ie 11'], grid: false, supports: false })
//       ]
//     }
//   })

//   return config
// }

/*

The following comes from here: https://github.com/gatsbyjs/gatsby/issues/318#issuecomment-357272207

*/

var extractTextWebpackPlugin = require('extract-text-webpack-plugin')

exports.modifyWebpackConfig = function({ config, stage }) {
  config.merge({
    postcss(wp) {
      return [
        require('postcss-cssnext')({ browsers: ['last 2 versions', '> 2%', 'ie 11'], grid: false, supports: false })
      ]
    }
  })

  if (stage === 'develop') {
    config.removeLoader('sass')
    config.loader('sass', {
      test: /\.(sass|scss)/,
      exclude: /\.module\.(sass|scss)$/,
      loaders: ['style', 'css', 'postcss', 'sass']
    })
  }

  // Ignore NPM packages that cause build errors
  if (stage === 'build-html') {
    config.loader('null', {
      test: /isotope-layout|scrollreveal/,
      loader: 'null-loader'
    })
  }

  if (stage === 'build-css') {
    config.removeLoader('sass')
    config.loader('sass', {
      test: /\.(sass|scss)/,
      exclude: /\.module\.(sass|scss)$/,
      loader: extractTextWebpackPlugin.extract(['css?minimize', 'postcss', 'sass'])
    })
  }

  return config
}
