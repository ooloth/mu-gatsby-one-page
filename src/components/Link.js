function Link({ href, srText, children, ...props }) {
  const isExternal = href.match(/http|\/\/|mailto:|tel:|static\/|pdf\//)
  const isId = href.match(/^#/)

  return isExternal || isId ? (
    <a
      href={href}
      onClick={e => e.stopPropagation()} // avoid firing parent event handlers
      target={isExternal ? `_blank` : null}
      rel={isExternal ? `noopener noreferrer` : null}
      {...props}
    >
      {srText && <span className="sr-only">{srText}</span>}
      {children}
    </a>
  ) : (
    <GatsbyLink
      to={href}
      onClick={e => e.stopPropagation()} // avoid firing parent event handlers
      {...props}
    >
      {srText && <span className="sr-only">{srText}</span>}
      {children}
    </GatsbyLink>
  )
}

Link.propTypes = {
  href: PropTypes.string.isRequired,
  srText: PropTypes.string, // if anchor has no visible text
  children: PropTypes.node
}

///////////////////////////////////////////////////////////////////////////////////

import React from 'react'
import PropTypes from 'prop-types'
import { Link as GatsbyLink } from 'gatsby'

export default Link
