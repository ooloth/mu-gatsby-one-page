function Metadata({ page, preconnect, preload }) {
  const site = useSiteMetadata()

  // Use sitewide metadata unless overridden by page-specific metadata
  const lang = page ? (page.lang ? page.lang : site.lang) : site.lang

  let title = page ? (page.title ? page.title : site.title) : site.title
  title = title.replace(`&nbsp;`, ` `)

  const description = page
    ? page.description
      ? page.description
      : site.description
    : site.description

  const url = page ? (page.url ? page.url : site.siteUrl) : site.siteUrl

  const image = page
    ? page.image
      ? site.siteUrl + page.image.childImageSharp.fluid.src
      : site.siteUrl + siteImage
    : site.siteUrl + siteImage

  const type = page ? (page.type ? page.type : `website`) : `website`

  return (
    <>
      <Helmet>
        {/* HTML language */}
        <html itemScope itemType="http://schema.org/WebPage" lang={lang} />

        {/* Title first (Gatsby already adds meta charset and viewport) */}
        <title itemProp="name">{title}</title>

        {/* Search engine */}
        <meta name="description" content={description} />
        <meta name="image" content={image} />
        <link rel="canonical" href={url} />

        {/* Preconnect to external resources */}
        {preconnect &&
          preconnect.map(url => <link key={url} rel="preconnect" href={url} />)}

        {/* Preloaded above-the-fold static assets (fonts, audio, video) */}
        {/* https://developer.mozilla.org/en-US/docs/Web/HTML/Preloading_content */}
        {preload &&
          preload.map(resource => (
            <link
              key={resource.href}
              rel="preload"
              href={resource.href}
              as={resource.as}
              type={resource.type}
              crossOrigin="anonymous"
            />
          ))}

        {/* Schema.org for Google */}
        <meta itemProp="name" content={title} />
        <meta itemProp="description" content={description} />
        <meta itemProp="image" content={image} />

        {/* Twitter */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={image} />

        {/* Open Graph general (Facebook, Pinterest, Slack) */}
        <meta property="og:type" content={type} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:site_name" content={site.title} />
        <meta property="og:url" content={url} />
        <meta property="og:image" content={image} />
        <meta property="og:locale" content={site.locale} />

        {/* Non-essential, but required for analytics */}
        {site.facebookAppId && (
          <meta property="fb:app_id" content={site.facebookAppId} />
        )}
        {site.twitterSite && (
          <meta name="twitter:site" content={site.twitterSite} />
        )}
        {site.twitterCreator && (
          <meta name="twitter:site" content={site.twitterCreator} />
        )}
        {/* Google Search Console verification */}
        {site.googleSiteVerification && (
          <meta
            name="google-site-verification"
            content={site.googleSiteVerification}
          />
        )}
      </Helmet>

      <StructuredData site={site} image={image} />
    </>
  )
}

Metadata.propTypes = {
  page: PropTypes.shape({
    lang: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    url: PropTypes.string,
    type: PropTypes.string
  }),
  preconnect: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  preload: PropTypes.oneOfType([PropTypes.string, PropTypes.array])
}

///////////////////////////////////////////////////////////////////////////////////

function StructuredData({ site, image }) {
  const {
    structuredDataType,
    siteUrl,
    title,
    jobTitle,
    description,
    email,
    telephone
  } = site
  const { street, locality, region, country } = site.address
  const sameAs = site.socialLinks.map(link => `"${link}"`)

  const structuredData = `{
    "@context": "http://schema.org",
    "@type": "${structuredDataType}",
    "@id": "${siteUrl}",
    "name": "${title}",
    ${jobTitle && `"jobTitle": "${jobTitle}",`}
    "description": "${description}",
    "url": "${siteUrl}",
    "image": "${image.replace(`js/../`, ``)}",
    ${email && `"email": "mailto:${email}",`}
    ${telephone && `"telephone": "${telephone}",`}
    ${(street || locality || region || country) &&
      `"address": {
        "@type": "PostalAddress",
        ${street && `"streetAddress": "${street}",`}
        ${locality && `"addressLocality": "${locality}",`}
        ${region && `"addressRegion": "${region}",`}
        ${country && `"addressCountry": "${country}"`}
      },
    `}
    "sameAs": [${sameAs}]
  }`

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: structuredData }}
    />
  )
}

///////////////////////////////////////////////////////////////////////////////////

import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'

import useSiteMetadata from '../queries/useSiteMetadata'
import siteImage from '../images/michael-uloth.jpg'

export default Metadata
