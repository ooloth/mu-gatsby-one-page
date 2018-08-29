const Base = ({ children }) => (
  <StaticQuery
    query={graphql`
      query {
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
    `}
    render={data => (
      <>
        <SiteMetadata site={data.site.siteMetadata} />
        {children}
        <BasicStructuredData site={data.site.siteMetadata} />
      </>
    )}
  />
)

/*
 *
 * Global styles
 * 
 */

import '../styles/index.css'

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

    {/* Preconnect to CloudFlare CDN (for GSAP) */}
    <link rel="preconnect" href="https://cdnjs.cloudflare.com" />

    {/* Schema.org for Google */}
    <meta itemProp="name" content={site.title} />
    <meta itemProp="description" content={site.description} />
    <meta itemProp="image" content={site.siteUrl + siteImage} />

    {/* Twitter */}
    <meta name="twitter:card" content="summary" />
    <meta name="twitter:title" content={site.title} />
    <meta name="twitter:description" content={site.description} />
    <meta name="twitter:image:src" content={site.siteUrl + siteImage} />

    {/* Open Graph general (Facebook, Pinterest, Slack & Google+) */}
    <meta property="og:title" content={site.title} />
    <meta property="og:type" content="website" />
    <meta property="og:url" content={site.siteUrl} />
    <meta property="og:image" content={site.siteUrl + siteImage} />
    <meta property="og:description" content={site.description} />
    <meta property="og:site_name" content={site.title} />
    <meta property="og:locale" content={site.locale} />

    {/* Google Search Console verification */}
    <meta
      name="google-site-verification"
      content="SwZ5_vDFUMkbYGZyzpeZh49ZTqf_59byEFmTG4eWK_w"
    />

    {/* Non-essential, but required for analytics */}
    {site.facebookAppId && (
      <meta property="fb:app_id" content={site.facebookAppId} />
    )}
    {site.twitterHandle && <meta name="twitter:site" content={site.twitterHandle} />}
  </Helmet>
)

/*
 *
 * Basic Structured Data
 * 
 */

const BasicStructuredData = ({ site }) => {
  const structuredData = `{
    "@context": "http://schema.org",
    "@type": "Person",
    "name": "Michael Uloth",
    "email": "mailto:hello@michaeluloth.com",
    "jobTitle": "Opera singer and web developer",
    "image": "${site.siteUrl + siteImage.replace(`js/../`, ``)}",
    "url": "${site.siteUrl}",
    "sameAs": [
      "https://www.facebook.com/michaeluloth",
      "https://www.linkedin.com/in/michael-uloth-848a1b98/",
      "http://twitter.com/ooloth",
      "http://instagram.com/ooloth"
    ]
  }`

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: structuredData }}
    />
  )
}

/*
 *
 * Imports & Exports
 * 
 */

import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import Helmet from 'react-helmet'

export default Base
