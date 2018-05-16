const BaseLayout = ({ children, data }) => (
  <Fragment>
    <SiteMetadata site={data.site.siteMetadata} />
    {children()}
    <BasicStructuredData />
  </Fragment>
)

/*
 *
 * Global styles
 * 
 */

// Use PostCSS stylesheet in development and PostCSS/PurgeCSS stylesheet in production:
switch (process.env.NODE_ENV) {
case `development`:
  require(`../styles/builds/after-postcss/output.css`)
  break
case `production`:
  require(`../styles/builds/after-purgecss/output.css`)
  break
}

/*
 *
 * Metadata
 * 
 */

// See: https://github.com/nfl/react-helmet + https://megatags.co + https://gethead.info

import siteImage from '../images/michael-uloth.jpg'

const SiteMetadata = ({ site }) => (
  <Helmet>
    {/* HTML language */}
    <html itemScope itemType="http://schema.org/WebPage" lang={site.language} />

    {/* Title comes first (meta charset and viewport are automatically included) */}
    <title itemProp="name" lang={site.language}>
      {site.title}
    </title>

    {/* Search engine */}
    <meta name="description" content={site.description} />
    <meta name="image" content={site.siteUrl + siteImage} />
    <link rel="canonical" href={site.siteUrl} />

    {/* Schema.org for Google */}
    <meta itemProp="name" content={site.title} />
    <meta itemProp="description" content={site.description} />
    <meta itemProp="image" content={site.siteUrl + siteImage} />

    {/* Twitter */}
    <meta name="twitter:card" content="summary" />
    <meta name="twitter:title" content={site.title} />
    <meta name="twitter:description" content={site.description} />
    {site.twitterHandle && <meta name="twitter:site" content={site.twitterHandle} />}
    <meta name="twitter:image:src" content={site.siteUrl + siteImage} />

    {/* Open Graph general (Facebook, Pinterest, Slack & Google+) */}
    <meta property="og:title" content={site.title} />
    <meta property="og:type" content="website" />
    <meta property="og:url" content={site.siteUrl} />
    <meta property="og:image" content={site.siteUrl + siteImage} />
    <meta property="og:description" content={site.description} />
    <meta property="og:site_name" content={site.title} />
    <meta property="og:locale" content={site.locale} />
  </Helmet>
)

/*
 *
 * Basic Structured Data
 * 
 */

const BasicStructuredData = () => (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: structuredData }}
  />
)

const siteUrl = `https://www.michaeluloth.com`

const structuredData = `{
  "@context": "http://schema.org",
  "@type": "Person",
  "name": "Michael Uloth",
  "jobTitle": "Opera singer and web developer",
  "image": "${siteUrl + siteImage}",
  "url": "https://www.michaeluloth.com",
  "email": "mailto:hello@michaeluloth.com",
  "telephone": "(416) 799-7753",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Toronto",
    "addressRegion": "ON",
    "postalCode": "M4M 1Y5",
    "streetAddress": "1133-70 Cambridge Avenue"
  },
  "alumniOf": "Wilfrid Laurier University, University of Toronto",
  "sameAs": [
    "https://www.facebook.com/michaeluloth",
    "https://www.linkedin.com/in/michael-uloth-848a1b98/",
    "http://twitter.com/ooloth",
    "http://instagram.com/ooloth"
  ]
}`

/*
 *
 * Queries
 * 
 */

export const query = graphql`
  query BaseQuery {
    site {
      siteMetadata {
        description
        language
        locale
        title
        twitterHandle
        siteUrl
      }
    }
  }
`

/*
 *
 * Imports & Exports
 * 
 */

import React, { Fragment } from 'react'
import Helmet from 'react-helmet'

export default BaseLayout
