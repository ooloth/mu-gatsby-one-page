const Hero = ({ content }) => {
  // Figure out text colour based on theme
  const { theme, title, titleMultiplier, blurb } = content
  const color = theme === `black` ? `white` : `black`

  return (
    <section
      className={`flex flex-column justify-center items-center bg-${theme} pv6 ph3 vh-100 ${color}`}
      style={{ maxHeight: `30rem` }}
    >
      <h1
        className="lh-solid fw9 ttu"
        style={{
          // textStroke: `4px black`,
          // webkitTextStroke: `5px black`,
          // textShadow: `8px 8px 16px rgb(0,0,0,.12)`,
          fontSize: `calc( (1vw + 1vh + .5vmin) * ${titleMultiplier} )`
          // letterSpacing: `.03em`
        }}
      >
        {title}
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
