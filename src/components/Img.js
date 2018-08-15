/*

A wrapper around gatsby-image that includes:

1. Lazy loading using react-waypoint (when image is within 200% of it's height of the viewport)
2. Object-fit and object-position polyfill (enabled by adding a font-family declaration)

Use like this:

<Img
  fluid={fluid}
  alt={alt}
  critical={true} (optional; default: false; set to true if in hero or wrapped by Reveal)
  objFit="cover" (optional; default: cover)
  objPosition="50% 0%" (optional; default: 50% 50%)
  className="..." (optional; goes to .gatsby-image-wrapper)
  style="..." (optional; goes to .gatsby-image-wrapper)
  outerWrapperClassName="..." (optional; goes to .gatsby-image-outer-wrapper)
  imgStyle="..." (optional; goes to the actual img element)
  position="absolute" (optional; default: "relative")
  backgroundColor="pink" (optional; default: false)
  Tag="figure" (optional; default: "div"; tag for wrapping elements)
/>

DOCS: https://www.gatsbyjs.org/packages/gatsby-image/#gatsby-image-props
DOCS: https://github.com/researchgate/react-intersection-observer
DOCS: https://github.com/bfred-it/object-fit-images/#usage

*/

const Img = props => {
  // Construct font-family declaration for object-fit-images
  const objFit = props.objFit ? props.objFit : `cover`
  const objPosition = props.objPosition ? props.objPosition : `50% 50%`
  const fontFamily = `"object-fit: ${objFit}; object-position: ${objPosition}"`

  const imgStyle = {
    objectFit: objFit,
    objectPosition: objPosition,
    fontFamily: fontFamily
  }

  return (
    <Image
      fluid={props.fluid}
      alt={props.alt}
      className={props.className}
      style={props.style}
      outerWrapperClassName={props.outerWrapperClassName}
      imgStyle={{ ...imgStyle }}
      position={props.position || `relative`}
      backgroundColor={props.backgroundColor || `transparent`}
      Tag={props.Tag || `div`}
    />
  )
}

/*
 *
 * Imports & Exports
 * 
 */

import React from 'react'
import Image from 'gatsby-image'

export default Img
