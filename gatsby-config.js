module.exports = {
  siteMetadata: {
    title: `Michael Uloth`
  },
  plugins: [
    // `gatsby-plugin-react-next`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `src`,
        path: `${__dirname}/src/`
      }
    },
    {
      resolve: 'gatsby-plugin-purify-css',
      options: {
        styleId: 'gatsby-inlined-css',
        purifyOptions: {
          info: true,
          minify: true
        }
      }
    },
    `gatsby-plugin-preact`,
    `gatsby-plugin-netlify` // must come last
  ]
}
