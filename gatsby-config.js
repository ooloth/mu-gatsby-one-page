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
    // `gatsby-plugin-preact`,
    `gatsby-plugin-react-next`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-json`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-netlify` // must come last
  ]
}
