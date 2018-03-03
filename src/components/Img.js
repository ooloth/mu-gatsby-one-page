/*

A wrapper around gatsby-image that includes:

1. Lazy loading using react-waypoint (when image is within 200% of it's height of the viewport)
2. Object-fit and object-position polyfill (enabled by adding a font-family declaration)

Use like this:

<Img
  sizes={sizes}
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

class Img extends React.Component {
  state = { revealed: false, critical: this.props.critical || false }

  handleWaypointEnter = () => {
    if (!this.state.revealed) {
      this.setState({ revealed: true })
      // console.log('Image in viewport!')
    }
  }

  // If the image needs to be shown right away, skip react-waypoints (which causes a page jump)
  renderStaticImage = () => {
    // Construct font-family declaration for object-fit-images
    const objFit = this.props.fit ? this.props.fit : `cover`
    const objPosition = this.props.position ? this.props.position : `50% 50%`
    const fontFamily = `"object-fit: ${objFit}; object-position: ${objPosition}"`

    const imgStyle = {
      objectFit: objFit,
      objectPosition: objPosition,
      fontFamily: fontFamily
    }

    return (
      <Image
        sizes={this.props.sizes}
        alt={this.props.alt}
        className={this.props.className}
        style={this.props.style}
        outerWrapperClassName={this.props.outerWrapperClassName}
        imgStyle={{ ...imgStyle }}
        position={this.props.position || `relative`}
        backgroundColor={this.props.backgroundColor || false}
        Tag={this.props.Tag || `div`}
      />
    )
  }

  renderWaypointImage = () => {
    return (
      <Waypoint
        ref={el => (this.box = el)}
        onEnter={this.handleWaypointEnter}
        topOffset="150%"
        bottomOffset="150%"
      >
        <figure>{this.state.revealed && this.renderStaticImage()}</figure>
      </Waypoint>
    )
  }

  render() {
    return (
      <div data-critical={this.state.critical || `false`}>
        {this.state.critical ? this.renderStaticImage() : this.renderWaypointImage()}
      </div>
    )
  }
}

export default Img

/*
 *
 * Imports
 * 
 */

import React from 'react'
import Image from 'gatsby-image'
import Waypoint from 'react-waypoint'
