const Footer = ({ className = `` }) => (
  <footer className={`pb3 ${className}`}>
    <Copyright />
  </footer>
)

/* 
 *
 * Copyright
 * 
 */

const Copyright = () => (
  <p className="container avenir f6 sm:f5">
    &copy; {new Date().getFullYear()} Michael Uloth
  </p>
)

/* 
 *
 * Imports & Exports
 * 
 */

import React from 'react'

export default Footer
