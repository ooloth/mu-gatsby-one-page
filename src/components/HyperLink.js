const HyperLink = ({ href, srText, className, children }) => {
  // If link is external, add target and rel attributes
  const isExternal = href.indexOf(`http`) === -1 ? false : true

  return (
    <a
      href={href}
      target={isExternal ? `_blank` : null}
      rel={isExternal ? `noopener nofollow` : null}
      className={className}
    >
      {srText && <span className="sr-only">{srText}</span>}
      {children}
    </a>
  )
}

/*
 *
 * Imports & Exports
 * 
 */

import React from 'react'

export default HyperLink

/*
 *  Usage: <HyperLink href="..." className="...">
 * 
 *  Props: 
 *    "href" = url, mandatory
 *    "srText" = string, optional (use if link has no visible text, like an icon)
 *    
 */
