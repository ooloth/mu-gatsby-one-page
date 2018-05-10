module.exports = {
  siteMetadata: {
    title: `Michael Uloth`,
    description: `Michael Uloth is a Toronto-based opera singer and web developer.`,
    siteUrl: `https://www.michaeluloth.com`,
    language: `en`,
    locale: `en_CA`,
    twitterHandle: `@ooloth`
    // image: update siteImage variable in layouts/index.js
  },
  plugins: [
    {
      resolve: `gatsby-plugin-accessibilityjs`,
      options: {
        injectStyles: false,
        errorClassName: false,
        onError: error => console.log(error)
      }
    },
    {
      resolve: 'gatsby-plugin-webpack-bundle-analyzer',
      options: {
        defaultSizes: `gzip`,
        disable: true,
        production: true
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `src`,
        path: `${__dirname}/src/`
      }
    },
    {
      resolve: `gatsby-plugin-sitemap`
    },
    `gatsby-plugin-react-next`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-json`,
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-plugin-netlify`, // must come last
      options: {
        headers: {
          '/*.html': [`Cache-Control: public, max-age=0, must-revalidate`],
          '/*.js': [`Cache-Control: public, max-age=0, must-revalidate`],
          '/static/*': [`Cache-Control: public,max-age=31536000,immutable`],
          '/favicons/*': [`Cache-Control: public,max-age=31536000,immutable`]
        }
      }
    }
  ]
}
