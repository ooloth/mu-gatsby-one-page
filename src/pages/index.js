const IndexPage = ({ data }) => (
  <div>
    <h1>My Website (Gatsby testing phase...)</h1>
    <Link to="/page-2/">Go to page 2</Link>
    <ImageTests sizes={data.placeholderImage.sizes} />
    <Slider sizes={data.placeholderImage.sizes} />
  </div>
)

export default IndexPage

/*

See below for all supporting imports, subcomponents & queries

*/

/* General Imports */

import React from 'react'
import Link from 'gatsby-link'

/* Image Tests */

import Image from 'gatsby-image'

const ImageTests = props => (
  <section className="pv5 tc">
    <h2>Gatsby-Image Test (Blur Up)</h2>
    <Image sizes={props.sizes} />
  </section>
)

/* Sliders */

import Slick from 'react-slick'
import '../../node_modules/slick-carousel/slick/slick.css'
import '../../node_modules/slick-carousel/slick/slick-theme.css'

class Slider extends React.Component {
  render() {
    const settings = {
      dots: true,
      arrows: true, // to see arrows, disable slick-theme.css (the arrows are offscreen)
      infinite: true,
      autoplay: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    }
    return (
      <div className="bg-near-white pv5">
        <h2 className="tc">React-Slick Test</h2>
        <div className="center w-50">
          <Slick {...settings}>
            <div>
              <Image sizes={this.props.sizes} />
            </div>
            <div>
              <Image sizes={this.props.sizes} />
            </div>
            <div>
              <Image sizes={this.props.sizes} />
            </div>
          </Slick>
        </div>
      </div>
    )
  }
}

export const query = graphql`
  query BlurUpQuery {
    placeholderImage: imageSharp(id: { regex: "/placeholder/" }) {
      sizes(maxWidth: 5211) {
        ...GatsbyImageSharpSizes
      }
    }
  }
`
