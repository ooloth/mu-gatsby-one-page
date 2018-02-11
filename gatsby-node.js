const ExtractTextPlugin = require('extract-text-webpack-plugin')

exports.modifyWebpackConfig = ({ config, stage }) => {
  switch (stage) {
    case 'develop':
      // Remove postcss from Gatsby's dev process (use CLI instead):
      config.removeLoader(`css`)
      config.loader(`css`, {
        test: /\.css$/,
        loaders: [`style`, `css`]
      })

      break

    case 'build-css':
      // Remove postcss from Gatsby's build process (use CLI instead):
      config.removeLoader(`css`)
      config.loader(`css`, {
        test: /after-purgecss\/main\.css/,
        loader: ExtractTextPlugin.extract([`css?minimize`])
      })

      break

    case 'build-html':
      // Ignore packages that causes errors during build
      config.loader('null', {
        test: /isotope-layout|scrollreveal/,
        loader: 'null-loader'
      })

      break

    case 'build-javascript':
      // ...
      break
  }

  return config
}
