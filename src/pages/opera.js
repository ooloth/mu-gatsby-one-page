const OperaPage = ({ data }) => (
  <main>
    <Hero content={heroContent} />
    {/* <Work sites={data.sites.edges} /> */}
  </main>
)

export default OperaPage

/* 
 *
 * Imports
 * 
 */

import React from 'react'
import Hero from '../components/Hero'

/* 
 *
 * Hero Content
 * 
 */

const heroContent = {
  theme: ``,
  title: `Opera`,
  titleMultiplier: `8`,
  blurb: `I’m a Toronto-based opera singer performing bass roles in Canada, the U.S. and Europe. Check out my previous work below.`
}
