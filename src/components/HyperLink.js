/*
 *  Usage: 
 * 
 *    <HyperLink href="..." className="...">
 * 
 *  Props: 
 * 
 *    1. "href" = url, mandatory
 *    
 */

const HyperLink = ({ href, className, children }) => {
  // If link is external, add target and rel attributes
  const isExternal = href.indexOf(`http`) === -1 ? false : true

  return (
    <a
      href={href}
      target={isExternal ? '_blank' : null}
      rel={isExternal ? 'noopener nofollow' : null}
      className={className}
    >
      {children}
    </a>
  )
}

export default HyperLink

/*
 *
 * Imports
 * 
 */

import React from 'react'
