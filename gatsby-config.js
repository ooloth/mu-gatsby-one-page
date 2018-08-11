module.exports = {
  siteMetadata: {
    title: `Michael Uloth`,
    description: `I'm an opera singer and web developer based in Toronto. Check out my recent work and get in touch to collaborate on your next project.`,
    siteUrl: `https://www.michaeluloth.com`,
    language: `en`,
    locale: `en_CA`,
    twitterHandle: `@ooloth`
    // image: update siteImage variable in layouts/index.js
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
      resolve: `gatsby-plugin-sitemap`,
      options: {
        exclude: [`/lab/*`]
      }
    },
    `gatsby-plugin-react-next`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-json`,
    `gatsby-transformer-sharp`,
    `gatsby-transformer-yaml`,
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
