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

      // Remove postcss from Gatsby's dev process:
      config.loader(`css`, {
        test: /\.css$/,
        exclude: `./src/styles/builds/after-sass/main.css`,
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

      // Remove postcss from Gatsby's build process:
      config.loader(`css`, {
        test: /\.css$/,
        exclude: [
          `./src/styles/builds/after-sass/main.css`,
          `./src/styles/builds/after-postcss/main.css`
        ],
        loader: ExtractTextPlugin.extract([`css?minimize`])
      })

      break

    case 'build-html':
      // Ignore packages that causes errors during build:
      config.loader('null', {
        test: /scrollreveal/,
        loader: 'null-loader'
      })

      break

    case 'build-javascript':
      // ...
      break
  }

  return config
}
