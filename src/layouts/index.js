class BaseLayout extends Component {
  componentDidMount = () => {
    // Load Google Analytics tracking code
    loadjs('https://www.googletagmanager.com/gtag/js?id=UA-9710963-3', () => {
      window.dataLayer = window.dataLayer || []

      function gtag() {
        dataLayer.push(arguments)
      }

      gtag('js', new Date())
      gtag('config', 'UA-9710963-3')
    })
  }

  render() {
    const { children, data } = this.props

    return (
      <div className="avenir">
        <SiteMetadata site={data.site.siteMetadata} />
        {children()}
        <BasicStructuredData />
      </div>
    )
  }
}

BaseLayout.propTypes = {
  children: PropTypes.func
}

export default BaseLayout

/*
 *
 * Imports
 * 
 */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import loadjs from 'loadjs'

/*
 *
 * Global styles
 * 
 */

// Use PostCSS stylesheet in development and PostCSS/PurgeCSS stylesheet in production:
switch (process.env.NODE_ENV) {
  case `development`:
    require('../styles/builds/after-postcss/output.css')
    break
  case `production`:
    require('../styles/builds/after-purgecss/output.css')
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
    <html itemscope itemtype="http://schema.org/WebPage" lang={site.language} />

    {/* Title comes first (meta charset and viewport are automatically included) */}
    <title itemProp="name" lang={site.language}>
      {site.title}
    </title>

    {/* Search engine */}
    <meta name="description" content={site.description} />
    <meta name="image" content={site.siteUrl + siteImage} />
    <link rel="canonical" href={site.siteUrl} />

    {/* Schema.org for Google */}
    <meta itemprop="name" content={site.title} />
    <meta itemprop="description" content={site.description} />
    <meta itemprop="image" content={site.siteUrl + siteImage} />

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

    {/* Google Search Console */}
    <meta
      name="google-site-verification"
      content="SwZ5_vDFUMkbYGZyzpeZh49ZTqf_59byEFmTG4eWK_w"
    />
  </Helmet>
)

/*
 *
 * Basic Structured Data
 * 
 */

const BasicStructuredData = () => (
  <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: structuredData }} />
)

const structuredData = `{
  "@context": "http://schema.org",
  "@type": "Person",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Toronto",
    addressRegion: "ON",
    postalCode: "M4M 1Y5",
    streetAddress: "1133-70 Cambridge Avenue"
  },
  email: "mailto:hello@michaeluloth.com",
  image: ${siteImage},
  jobTitle: "Opera singer and web developer",
  name: "Michael Uloth",
  alumniOf: "Wilfrid Laurier University, University of Toronto",
  telephone: "(416) 799-7753",
  url: "https://www.michaeluloth.com",
  sameAs: [
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
