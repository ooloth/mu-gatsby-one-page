/*
 *
 * Robots.txt variables
 *
 */

const {
  NODE_ENV,
  URL: NETLIFY_SITE_URL = `https://www.michaeluloth.com`,
  DEPLOY_PRIME_URL: NETLIFY_DEPLOY_URL = NETLIFY_SITE_URL,
  CONTEXT: NETLIFY_ENV = NODE_ENV
} = process.env
const isNetlifyProduction = NETLIFY_ENV === `production`
const siteUrl = isNetlifyProduction ? NETLIFY_SITE_URL : NETLIFY_DEPLOY_URL

// Set up dotenv for Google Analytics tracking ID
///////////////////////////////////////////////////////////////////////////////////
require('dotenv').config()

/*
 *
 * Config
 *
 */

module.exports = {
  siteMetadata: {
    title: `Michael Uloth`,
    description: `I'm an opera singer and web developer based in Toronto. Check out my recent work and get in touch to collaborate on your next project.`,
    siteUrl: `https://www.michaeluloth.com`,
    language: `en`,
    locale: `en_CA`,
    twitterHandle: `@ooloth`
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `src`,
        path: `${__dirname}/src/`
      }
    },
    `gatsby-plugin-postcss`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    `gatsby-transformer-yaml`,
    {
      resolve: `gatsby-plugin-svgr`,
      options: {
        // see https://github.com/smooth-code/svgr for a list of all options
      }
    },
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        exclude: [`/lab`, `/lab/*`]
      }
    },
    {
      resolve: `gatsby-plugin-robots-txt`,
      // Disable crawlers for Netlify deploy-previews:
      options: {
        resolveEnv: () => NETLIFY_ENV,
        env: {
          production: {
            policy: [{ userAgent: `*` }]
          },
          'branch-deploy': {
            policy: [{ userAgent: `*`, disallow: [`/`] }],
            sitemap: null,
            host: null
          },
          'deploy-preview': {
            policy: [{ userAgent: `*`, disallow: [`/`] }],
            sitemap: null,
            host: null
          }
        }
      }
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Michael Uloth`,
        short_name: `M. Uloth`,
        start_url: `/`,
        // For splash screen when app launches:
        background_color: `#2eec96`,
        // For tool bar and task switcher:
        theme_color: `#2eec96`,
        display: `minimal-ui`,
        // Multiple icons will be generated for various devices.
        // Multiple favicons will be generated and added to each HTML page.
        // This path is relative to the root of the site.
        icon: `src/images/favicon.png`
      }
    },
    `gatsby-plugin-offline`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: process.env.GOOGLE_ANALYTICS_TRACKING_ID,
        head: true, // Puts tracking script in the head instead of the body
        anonymize: true,
        respectDNT: true
      }
    },
    // `gatsby-plugin-netlify-cache`,
    {
      resolve: `gatsby-plugin-netlify`, // must come last
      options: {
        headers: {
          '/*.html': [`Cache-Control: public, max-age=0, must-revalidate`],
          '/*.js': [`Cache-Control: public, max-age=0, must-revalidate`],
          '/sw.js': [`Cache-Control: no-cache`],
          '/icons/*': [`Cache-Control: public,max-age=31536000,immutable`],
          '/static/*': [`Cache-Control: public,max-age=31536000,immutable`],
          '/subfont/*': [`Cache-Control: public,max-age=31536000,immutable`]
        }
      }
    }
  ]
}
