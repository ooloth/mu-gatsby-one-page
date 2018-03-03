const Contact = () => (
  <div>
    <section className="bg-green pt6 pb3 ph3 tc">
      <h2
        className="lh-solid f1 sm:f-4 fw9 ttu tracked-slight"
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
      <p className="ml-auto mr-auto pt3 pb4 measure-narrow tc lh-tall f4">
        Want to work together? <br className="dn sm:di" />Tell me about your project!
      </p>
      <HyperLink
        href="mailto:hello@michaeluloth.com"
        className="link link-black-to-white dib mb6"
      >
        Get in touch
      </HyperLink>
    </section>
    <Footer theme="green" />
  </div>
)

export default Contact

/* 
 *
 * Imports
 * 
 */

import React from 'react'
// import Aux from 'react-aux'

import Footer from './Footer'
import HyperLink from './HyperLink'
