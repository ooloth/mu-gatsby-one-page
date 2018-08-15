/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

/*
 *
 * Urgent polyfills (before first render) + priority scripts for user interaction
 * 
 */

export const onClientEntry = () => {
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

export const onInitialClientRender = () => {
  // A11Y: Detect keyboard vs. mouse vs. touch input (for focus styling)
  if (!loadjs.isDefined(`what-input`)) {
    loadjs(
      `https://cdnjs.cloudflare.com/ajax/libs/what-input/5.0.5/what-input.min.js`,
      `what-input`
    )
  }

  // GSAP for site-wide animations
  if (!loadjs.isDefined(`gsap`)) {
    loadjs(
      [
        `https://cdnjs.cloudflare.com/ajax/libs/gsap/2.0.1/TweenLite.min.js`,
        `https://cdnjs.cloudflare.com/ajax/libs/gsap/2.0.1/plugins/CSSPlugin.min.js`
      ],
      `gsap`
    )
  }

  // Google Analytics
  loadjs(`https://www.googletagmanager.com/gtag/js?id=UA-9710963-3`, () => {
    window.dataLayer = window.dataLayer || []
    function gtag() {
      dataLayer.push(arguments)
    }

    gtag(`js`, new Date())
    gtag(`config`, `UA-9710963-3`)
  })
}

/*
 *
 * Imports
 * 
 */

import loadjs from 'loadjs'
