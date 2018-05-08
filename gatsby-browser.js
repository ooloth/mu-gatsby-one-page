/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

/*
 *
 * Urgent polyfills (before first render)
 * 
 */

exports.onClientEntry = () => {
  // NOTE: Don't polyfill Promise here (Gatsby already includes a Promise polyfill)

  // IntersectionObserver polyfill for gatsby-image (Safari, IE)
  if (typeof window.IntersectionObserver === `undefined`) {
    require(`intersection-observer`)
  }

  // Object-fit/Object-position polyfill for gatsby-image (IE)
  const testImg = document.createElement(`img`)
  if (
    typeof testImg.style.objectFit === `undefined` ||
    typeof testImg.style.objectPosition === `undefined`
  ) {
    require(`object-fit-images`)()
  }
}

/*
 *
 * Non-urgent polyfills and global scripts (after first render)
 * 
 */

import loadjs from 'loadjs'

exports.onInitialClientRender = () => {
  // GSAP for site-wide animations
  loadjs(`https://cdnjs.cloudflare.com/ajax/libs/gsap/1.20.4/TweenMax.min.js`, `gsap`)

  // A11Y: Detect keyboard vs. mouse vs. touch input (for focus styling)
  loadjs(`https://cdnjs.cloudflare.com/ajax/libs/what-input/5.0.5/what-input.min.js`)
}
