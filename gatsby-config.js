// Use environment variables for Google Analytics + Search Console
require(`dotenv`).config()

// Robots.txt variables
const {
  NODE_ENV,
  URL: NETLIFY_SITE_URL = `https://www.michaeluloth.com`,
  DEPLOY_PRIME_URL: NETLIFY_DEPLOY_URL = NETLIFY_SITE_URL,
  CONTEXT: NETLIFY_ENV = NODE_ENV
} = process.env
const isNetlifyProduction = NETLIFY_ENV === `production`
const siteUrl = isNetlifyProduction ? NETLIFY_SITE_URL : NETLIFY_DEPLOY_URL

// Config
module.exports = {
  siteMetadata: {
    title: `Michael Uloth`,
    jobTitle: `Web Developer and Opera Singer`,
    description: `Hi! 👋 I'm a web developer and opera singer currently based in Toronto. Check out my recent work and feel free to reach out if you'd like to collaborate.`,
    siteUrl: `https://www.michaeluloth.com`, // no trailing slash
    lang: `en`,
    locale: `en_CA`,
    email: `hello@michaeluloth.com`,
    telephone: ``,
    address: {
      street: ``,
      locality: `Toronto`,
      region: `ON`,
      postalCode: ``,
      country: `CA`
    },
    socialLinks: [
      `https://twitter.com/ooloth`,
      `https://www.linkedin.com/in/michael-uloth-848a1b98`,
      `https://github.com/ooloth`,
      `https://stackoverflow.com/users/8802485/ooloth`,
      `https://dev.to/ooloth`,
      `https://www.freecodecamp.org/news/author/ooloth/`,
      `https://medium.com/@michaeluloth`,
      `https://www.facebook.com/michaeluloth`,
      `https://www.instagram.com/ooloth/`
    ],
    structuredDataType: `Person`,
    twitterSite: `@ooloth`,
    twitterCreator: `@ooloth`,
    facebookAppId: ``,
    googleSiteVerification: process.env.GOOGLE_SITE_VERIFICATION_STRING // GSC
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
        head: true, // https://csswizardry.com/2018/11/css-and-network-performance/
        anonymize: true,
        respectDNT: true
      }
    },
    `gatsby-plugin-netlify-cache`,
    {
      resolve: `gatsby-plugin-netlify`, // must come last
      options: {
        headers: {
          '/*.html': [`Cache-Control: public,max-age=0,must-revalidate`],
          '/*.js': [`Cache-Control: public,max-age=0,must-revalidate`],
          '/sw.js': [`Cache-Control: max-age=0,no-cache,no-store,must-revalidate`],
          '/icons/*': [`Cache-Control: public,max-age=31536000,immutable`],
          '/static/*': [`Cache-Control: public,max-age=31536000,immutable`]
        }
      }
    }
  ]
}
