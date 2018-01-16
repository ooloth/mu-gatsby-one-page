/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// IE11 polyfill for object-fit/position (used by gatsby-image)
import objectFitImages from 'object-fit-images'

exports.onClientEntry = () => {
  // console.log("We've started!")
  objectFitImages()
}
