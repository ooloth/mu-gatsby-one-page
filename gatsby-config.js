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
    // `gatsby-plugin-preact`, // doesn't work with react-simple-chatbot
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-react-next`, // disable if using preact
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-netlify` // must come last
  ]
}
