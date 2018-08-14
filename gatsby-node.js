/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const ExtractTextPlugin = require('extract-text-webpack-plugin')

// For accessing Firebase environment variables in development (they're retrieved from Netlify in production)
require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`
})

exports.modifyWebpackConfig = ({ config, stage }) => {
  switch (stage) {
    case 'develop':
      // Remove default loaders
      config.removeLoader(`css`)
      config.removeLoader(`less`)
      config.removeLoader(`sass`)
      config.removeLoader(`cssModules`)
      config.removeLoader(`lessModules`)
      config.removeLoader(`sassModules`)

      // Remove postcss from Gatsby's dev process and ignore partials
      config.loader(`css`, {
        test: /\.css$/,
        exclude: [
          /src\/styles\/builds\/after-purgecss/,
          /src\/styles\/components/,
          /src\/styles\/fonts/,
          /src\/styles\/plugins/,
          /src\/styles\/reset/,
          /src\/styles\/supports/,
          /src\/styles\/utilities/
        ],
        loaders: [`style`, `css`]
      })

      break

    case 'build-css':
      // Remove default loaders
      config.removeLoader(`css`)
      config.removeLoader(`less`)
      config.removeLoader(`sass`)
      config.removeLoader(`cssModules`)
      config.removeLoader(`lessModules`)
      config.removeLoader(`sassModules`)

      // Remove postcss from Gatsby's build process and ignore partials
      config.loader(`css`, {
        test: /\.css$/,
        exclude: [
          /src\/styles\/base/,
          /src\/styles\/builds\/after-postcss/,
          /src\/styles\/components/,
          /src\/styles\/plugins/,
          /src\/styles\/reset/,
          /src\/styles\/supports/,
          /src\/styles\/utilities/
        ],
        loader: ExtractTextPlugin.extract([`css?minimize`])
      })

      break

    case 'build-html':
      // Ignore packages that causes errors during build because they refer to the document/window (make test an array if > 1):
      config.loader(`null`, {
        test: /intersection-observer/,
        loader: `null-loader`
      })

      // For Netlify's environment variables
      config.externals = `aws-sdk`

      break
  }

  return config
}

// In Gatsby v1, I need to run dependencies that use ES6 through Babel myself.
// In this case, this is to debug build errors the prange library:
// exports.modifyBabelrc = ({ babelrc }) => ({
//   ...babelrc,
//   plugins: babelrc.plugins.concat(['transform-es2015-modules-amd'])
// })
