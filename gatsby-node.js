/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const ExtractTextPlugin = require('extract-text-webpack-plugin')

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
      // Ignore packages that causes errors during build:
      // config.loader('null', {
      //   test: [/scrollreveal/, /isotope-layout/],
      //   loader: 'null-loader'
      // })

      break

    case 'build-javascript':
      // ...
      break
  }

  return config
}
