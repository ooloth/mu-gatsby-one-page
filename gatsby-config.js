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
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `data`,
        path: `${__dirname}/src/data/`
      }
    },
    // `gatsby-plugin-preact`, // doesn't work with react-simple-chatbot
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-react-next`, // disable if using preact
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    `gatsby-transformer-json`,
    `gatsby-plugin-netlify` // must come last
  ]
}
