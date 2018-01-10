/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// You can delete this file if you're not using it

import objectFitImages from 'object-fit-images'

exports.onClientEntry = () => {
  // objectFitImages() // initialize object-fit-images polyfill (for object-fit/object-position in IE11)
}

exports.onInitialClientRender = () => {
  objectFitImages() // initialize object-fit-images polyfill (for object-fit/object-position in IE11)
}
