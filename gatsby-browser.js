/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// Only load polyfills when needed
// See: https://philipwalton.com/articles/loading-polyfills-only-when-needed/
// See: https://polyfill.io/v2/docs/examples

// Define JS features I need browsers to support:
const browserSupportsAllJsFeatures = () => {
  return window.fetch && window.Promise && window.Symbol && window.Array.from
}

// IE11 polyfill for object-fit/position (used by gatsby-image)
import objectFitImages from 'object-fit-images'

// Define CSS features I need browsers to support:
const browserSupportsAllCssFeatures = () => {
  return document.body.style.objectFit && document.body.style.objectFit
}

// Create a script tag and append it to the document head:
const loadScript = url => {
  let script = document.createElement('script')
  script.src = url
  script.onload = () => console.log(`Successfully loaded script ${url}`)
  script.onerror = () => console.log(`Failed to load script ${url}`)
  document.head.appendChild(script)
}

exports.onClientEntry = () => {
  // JS polyfills
  if (!browserSupportsAllJsFeatures()) {
    // If the browser doesn't support the features above, load these polyfills
    loadScript(
      'https://cdn.polyfill.io/v2/polyfill.js?features=default,Symbol,fetch&flags=gated&rum=1'
    )
  }

  // CSS polyfills
  if (!browserSupportsAllCssFeatures()) {
    // If the browser doesn't support the features above, load these polyfills
    objectFitImages()
  }
}
