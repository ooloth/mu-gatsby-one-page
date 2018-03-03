/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

/*
 *
 * Polyfills (onClientEntry)
 * 
 */

// Only load polyfills when needed
// See: https://philipwalton.com/articles/loading-polyfills-only-when-needed/

// IE11 polyfill for object-fit/position (used by gatsby-image)
// import objectFitImages from 'object-fit-images'

exports.onClientEntry = () => {
  /*
   *
   * JS polyfills
   * 
   */

  // Test required JS features:
  const browserSupportsAllJsFeatures = () => {
    // NOTE: Gatsby includes a Promise polyfill already (don't duplicate it here)
    // return fetch
    return true
  }

  // Add polyfills via a script tag appended to the document head:
  const loadScript = url => {
    let script = document.createElement('script')
    script.src = url
    script.onload = 'console.log(`Successfully loaded script ${url}`)'
    script.onerror = 'console.log(`Failed to load script ${url}`)'
    document.head.appendChild(script)
  }

  // JS polyfills (TODO: update URL for specific features needed; don't include 'default')
  if (!browserSupportsAllJsFeatures()) {
    // See: https://polyfill.io/v2/docs/examples

    // loadScript(`https://cdn.polyfill.io/v2/polyfill.min.js?features=fetch&flags=gated`)
    // require('intersection-observer')
    console.log('👍 Loaded polyfills!')
  } else {
    // console.log(`Didn't load polyfills!`)
  }

  /*
   *
   * CSS polyfills
   * 
   */

  // Define CSS features I need browsers to support:
  const browserSupportsAllCssFeatures = () => {
    const testImg = document.createElement('img')
    if (testImg.style.objectFit === undefined || testImg.style.objectPosition === undefined) {
      return false
    }
    return true
  }

  // CSS polyfills
  if (!browserSupportsAllCssFeatures()) {
    // If the browser doesn't support the features above, load these polyfills
    // TODO: confirm this way of loading it still works...
    require('object-fit-images')()
    // objectFitImages()
    console.log('👍 Loaded objectFitImages!')
  } else {
    // console.log(`Didn't load objectFitImages!`)
  }
}

/*
 *
 * Secondary scripts (onInitialClientRender)
 * 
 */

// Detect keyboard vs. mouse vs. touch input
exports.onInitialClientRender = () => require('what-input')
