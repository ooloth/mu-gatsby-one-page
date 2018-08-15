/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

/*
 *
 * Environment variables (for Firebase)
 *
 */

//MOVED TO GATSBY-CONFIG
// require('dotenv').config({
//   path: `.env.${process.env.NODE_ENV}`
// })

/*
 *
 * PurgeCSS variables
 *
 */

const PurgeCssPlugin = require(`purgecss-webpack-plugin`)
const path = require(`path`)
const glob = require(`glob`)

const PATHS = {
  src: path.join(__dirname, `src`)
}

const purgeCssConfig = {
  paths: glob.sync(`${PATHS.src}/**/*.js`, { nodir: true }),
  extractors: [
    {
      // Custom extractor to allow special characters (like ":") in class names
      // See: https://tailwindcss.com/docs/controlling-file-size/#removing-unused-css-with-purgecss
      extractor: class {
        static extract(content) {
          return content.match(/[A-Za-z0-9-_:/]+/g) || []
        }
      },
      extensions: [`js`]
    }
  ],
  whitelist: [
    `checkbox-label`,
    `custom-checkbox`,
    `link-inline`,
    `mr4`,
    `o-0`,
    `group-hover:o-100`
  ],
  whitelistPatterns: [/body/]
}

/*
 *
 * Webpack updates
 *
 */

exports.onCreateWebpackConfig = ({ actions, stage }) => {
  if (stage.includes(`develop`)) return

  // Add PurgeCSS in production
  // See: https://github.com/gatsbyjs/gatsby/issues/5778#issuecomment-402481270
  if (stage.includes(`build`)) {
    actions.setWebpackConfig({
      plugins: [new PurgeCssPlugin(purgeCssConfig)]
    })
  }

  if (stage === `build-html`) {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: [/intersection-observer/],
            loader: `null-loader`
          }
        ]
      }
    })
  }
}
