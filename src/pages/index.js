const IndexPage = ({ data }) => (
  <div className="tc">
    <h1>My Website (Gatsby testing phase...)</h1>
    <Link to="/page-2/">Go to page 2</Link>
    <ImageTests sizes={data.placeholderImage.sizes} />
    <ReactSlick sizes={data.placeholderImage.sizes} />
    <IsotopeTests sizes={data.placeholderImage.sizes} />
  </div>
)

export default IndexPage

/*

See below for all supporting imports, subcomponents & queries

*/

/* General Imports */

import React from 'react'
import Link from 'gatsby-link'

/* Gatsby-Image Tests */

import Image from 'gatsby-image'

const ImageTests = props => (
  <section className="pv5 tc">
    <h2>Gatsby-Image Test (Blur Up)</h2>
    <Image sizes={props.sizes} />
  </section>
)

/* React-Slick Tests */

import Slick from 'react-slick'
import '../../node_modules/slick-carousel/slick/slick.css'
import '../../node_modules/slick-carousel/slick/slick-theme.css'

class ReactSlick extends React.Component {
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

/* 

Isotope Test 

- to explain how this setup works, see Hubert's answer here: https://stackoverflow.com/questions/25135261/react-js-and-isotope-js/29866950

- as an alternative, use: https://github.com/eiriklv/react-masonry-component

*/

import ReactDOM from 'react-dom'
import Isotope from 'isotope-layout'

const IsotopeTests = props => (
  <section>
    <h2>Isotope Test</h2>
    <IsotopeContainer>
      {isotopeItems.map(item => {
        return (
          <div key={item.key} className={item.classes}>
            <Image sizes={props.sizes} />
          </div>
        )
      })}
    </IsotopeContainer>
  </section>
)

const isotopeItems = [
  { key: 1, classes: `w-25` },
  { key: 2, classes: `w-50` },
  { key: 3, classes: `w-25` },
  { key: 4, classes: `w-25` },
  { key: 5, classes: `w-25` },
  { key: 6, classes: `w-50` }
]

// Isotope Container (logic only)
class IsotopeContainer extends React.Component {
  render() {
    return <div>{this.props.children}</div>
  }

  state = { isotope: null }

  // Set up Isotope here
  componentDidMount() {
    const node = ReactDOM.findDOMNode(this)
    // console.info(node)

    if (!this.state.isotope) {
      // console.log(`No Isotope! Let's initialize it.`)
      this.setState({
        isotope: new Isotope(node)
      })
      // console.log(`Here it is: ${this.state.isotope}`)
    } else {
      // console.log(`Already have Isotope! Let's reload it.`)
      this.state.isotope.reloadItems()
    }
  }

  // Update Isotope layout here
  componentDidUpdate() {
    if (this.state.isotope) {
      this.state.isotope.reloadItems()
      this.state.isotope.layout()
    }
  }
}

// Index page queries
export const query = graphql`
  query BlurUpQuery {
    placeholderImage: imageSharp(id: { regex: "/placeholder/" }) {
      sizes(maxWidth: 5211) {
        ...GatsbyImageSharpSizes
      }
    }
  }
`
