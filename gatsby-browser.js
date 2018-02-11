/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// IE11 polyfill for object-fit/position (used by gatsby-image)
import objectFitImages from 'object-fit-images'

// IE11 polyfill for fetch (no function call needed)
import 'whatwg-fetch'

exports.onClientEntry = () => objectFitImages()
