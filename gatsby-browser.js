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
 * Non-urgent scripts (after first render)
 * 
 */

export const onInitialClientRender = () => {
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

  // A11Y: Detect keyboard vs. mouse vs. touch input (for focus styling)
  if (!loadjs.isDefined(`what-input`)) {
    loadjs(
      `https://cdnjs.cloudflare.com/ajax/libs/what-input/5.0.5/what-input.min.js`,
      `what-input`
    )
  }

  // Google Analytics (using ga-lite to allow caching)
  // See: https://github.com/jehna/ga-lite
  // Don't waste any time on this on localhost
  if (window.location.hostname !== 'localhost') {
    if (!loadjs.isDefined(`ga-lite`)) {
      loadjs(
        `https://cdn.jsdelivr.net/npm/ga-lite@2/dist/ga-lite.min.js`,
        `ga-lite`,
        () => {
          // See: https://developers.google.com/analytics/devguides/collection/analyticsjs/cookies-user-id#automatic_cookie_domain_configuration
          galite('create', 'UA-9710963-3', 'auto') // auto prevents tracking on localhost
          galite('send', 'pageview')

          // See: https://github.com/jehna/ga-lite#onunload-tracking
          window.addEventListener('unload', () => {
            galite('send', 'timing', 'JS Dependencies', 'unload')
          })
        }
      )
    }
  }
}

/*
 *
 * Imports
 * 
 */

import loadjs from 'loadjs'
