class HyperLink extends Component {
  // Prevent link clicks from triggering click event handlers on parent components
  // See: https://stackoverflow.com/questions/1369035/how-do-i-prevent-a-parents-onclick-event-from-firing-when-a-child-anchor-is-cli
  // See: https://stackoverflow.com/questions/37568550/react-prevent-event-trigger-on-parent-from-child
  handleClick = e => e.stopPropagation()

  render() {
    const { href, srText, className, children } = this.props
    const isExternal = href.indexOf(`http`) === -1 ? false : true

    return (
      <a
        href={href}
        onClick={this.handleClick}
        target={isExternal ? `_blank` : null}
        rel={isExternal ? `noopener nofollow` : null}
        className={className}
      >
        {srText && <span className="sr-only">{srText}</span>}
        {children}
      </a>
    )
  }
}

/*
 *
 * Imports & Exports
 * 
 */

import React, { Component } from 'react'

export default HyperLink

/*
 *  Usage: <HyperLink href="..." className="...">
 * 
 *  Props: 
 *    "href" = url, mandatory
 *    "srText" = string, optional (use if link has no visible text, like an icon)
 *    
 */
