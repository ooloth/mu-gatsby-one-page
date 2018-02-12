const Contact = () => (
  <footer className="bg-green pt6 pb3 ph3 tc">
    <h2
      className="lh-solid f1 fw9 ttu tracked-slight"
      // style={{
      //   // textStroke: `4px black`,
      //   // webkitTextStroke: `5px black`,
      //   // textShadow: `8px 8px 16px rgb(0,0,0,.12)`,
      //   fontSize: `calc( (1vw + 1vh + .5vmin) * 2.5 )`
      //   // letterSpacing: `.03em`
      // }}
    >
      Contact Me
    </h2>
    <p className="ml-auto mr-auto pt3 pb4 measure-narrow tc lh-tall">
      Want to work together? Tell me about your project <br className="dn sm:di" />and I'll be happy
      to help.
    </p>
    <HyperLink href="mailto:hello@michaeluloth.com" className="link link-white dib mb6">
      Get in touch
    </HyperLink>
    <p className="f6">&copy; {new Date().getFullYear()} Michael Uloth</p>
  </footer>
)

export default Contact

/* 
 *
 * Imports
 * 
 */

import React from 'react'
import HyperLink from './HyperLink'
