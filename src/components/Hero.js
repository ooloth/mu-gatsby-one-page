const Hero = ({ content }) => {
  // Figure out text colour based on theme
  const { theme, title, titleMultiplier, blurb } = content
  const styles = theme === `black` ? `bg-black white` : `bg-green black`

  return (
    <section
      className={`flex flex-column justify-center items-center overflow-hidden pv6 ph3 ${styles}`}
      style={{
        height: `100vh`
        // maxHeight: `30rem`
      }}
    >
      <h1
        className="lh-solid fw9 ttu goofy"
        style={{
          fontSize: `calc( (1vw + 1vh + .5vmin) * ${titleMultiplier} )`,
          textShadow: `6px 6px 10px rgba(0,0,0,0.11)`
        }}
      >
        {title.split('').map(letter => <span>{letter}</span>)}
      </h1>
      <p className="pt3 measure-narrow tc lh-tall f4 pre-line">{blurb}</p>
    </section>
  )
}

export default Hero

/*  
 *
 * Imports
 * 
 */

import React from 'react'
