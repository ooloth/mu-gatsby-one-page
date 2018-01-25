module.exports = {
  siteMetadata: {
    title: `Michael Uloth`
  },
  plugins: [
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
    // `gatsby-plugin-preact`, // doesn't work with react-simple-chatbot
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-react-next`, // disable if using preact
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-netlify` // must come last
  ]
}
