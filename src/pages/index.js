const IndexPage = ({ data }) => (
  <div className="tc">
    <h1>My Website (Gatsby testing phase...)</h1>
    <Link to="/page-2/">Go to page 2</Link>
    <ImageTests sizes={data.placeholderImage.sizes} />
    <ReactSlick sizes={data.placeholderImage.sizes} />
    <IsotopeTests sizes={data.placeholderImage.sizes} />
    <div className="pv7" />
  </div>
)

export default IndexPage

/*

Supporting imports, subcomponents & queries...

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

Isotope Test (with filtering + "load more")

- to explain how this setup works, see Hubert's answer here: https://stackoverflow.com/questions/25135261/react-js-and-isotope-js/29866950

- as an alternative, use: https://github.com/eiriklv/react-masonry-component

*/

import ReactDOM from 'react-dom'
import Isotope from 'isotope-layout'

const IsotopeTests = props => (
  <section>
    <h2>Isotope Test</h2>
    <IsotopeContainer sizes={props.sizes} />
  </section>
)

const isotopeItems = [
  { key: 1, category: `category-1`, classes: `js-isotope-item all category-1 w-25 visible` },
  { key: 2, category: `category-2`, classes: `js-isotope-item all category-2 w-50 visible` },
  { key: 3, category: `category-2`, classes: `js-isotope-item all category-2 w-25 visible` },
  { key: 4, category: `category-1`, classes: `js-isotope-item all category-1 w-25 visible` },
  { key: 5, category: `category-1`, classes: `js-isotope-item all category-1 w-25 visible` },
  { key: 6, category: `category-2`, classes: `js-isotope-item all category-2 w-50 visible` }
]

const FilterButtons = props => (
  <div className="js-filter-buttons">
    <button onClick={category => props.handleFilter((category = 'all'))} className="js-filter-button">
      All
    </button>
    <button onClick={category => props.handleFilter((category = 'category-1'))} className="js-filter-button">
      Category 1
    </button>
    <button onClick={category => props.handleFilter((category = 'category-2'))} className="js-filter-button">
      Category 2
    </button>
  </div>
)

// Isotope Container (logic for initialization + filtering + "load more")
class IsotopeContainer extends React.Component {
  render() {
    // Update classes on each Isotope item (to show the right category and # of items)

    let counter = 0
    // console.log(`category`, category)

    const allItemsWithClassesUpdated = this.state.allItems.map(item => {
      // Add "visible" class if item is right category and # limit hasn't been reached
      if (
        (item.category === this.state.category.substring(1) || this.state.category === `.all`) &&
        counter < this.state.howManyToShow
      ) {
        const classList = item.classes.replace(`hidden`, `visible`)
        item.classes = classList

        // Increment counter
        counter++

        console.log(`counter`, counter)

        // Otherwise, remove "visible class"
      } else {
        const classList = item.classes.replace(`visible`, `hidden`)
        item.classes = classList
      }
      return item
    })

    return (
      <div>
        <FilterButtons handleFilter={this.filterItems} />
        <div ref={node => (this.node = node)}>
          {allItemsWithClassesUpdated.map((item, index) => {
            return (
              <div key={item.key} className={item.classes}>
                <Image sizes={this.props.sizes} />
              </div>
            )
          })}
        </div>
        {this.state.showLoadMoreBtn && <button onClick={this.showMoreItems}>Load more</button>}
      </div>
    )
  }

  state = {
    isotope: null,
    allItems: isotopeItems,
    activeCategoryItems: isotopeItems,
    category: `.all`,
    initialNumber: 2,
    increment: 2,
    howManyToShow: 2,
    showLoadMoreBtn: true
  }

  // Initialize Isotope
  componentDidMount() {
    if (!this.state.isotope) {
      this.setState({
        isotope: new Isotope(this.node)
      })
    } else {
      this.state.isotope.arrange({ filter: `.visible` })
    }
  }

  // This is what actually updates Isotope (after state changes trigger a new render)
  componentDidUpdate() {
    if (this.state.isotope) {
      this.state.isotope.arrange({ filter: `.visible` })
    }
  }

  filterItems = category => {
    if (this.state.isotope) {
      // To get the length of the activeCategoryItems array for the showMoreItems() method, filter allItems by the active category
      let categoryItems = null
      if (category === `all`) {
        categoryItems = this.state.allItems
      } else {
        categoryItems = this.state.allItems.filter(item => item.category === category)
      }

      // Determine whether to show the "Load More" button
      let showLoadMoreBtn = true
      if (this.state.initialNumber >= categoryItems.length) {
        showLoadMoreBtn = false
      }

      // Update the state (triggers render() + componentDidUpdate())
      this.setState({
        category: `.${category}`,
        howManyToShow: this.state.initialNumber,
        activeCategoryItems: categoryItems,
        showLoadMoreBtn: showLoadMoreBtn
      })
    }
  }

  showMoreItems = () => {
    // Increment the items showing by the increment
    let newNumberToShow = this.state.howManyToShow + this.state.increment
    let showLoadMoreBtn = true

    // Cap the items showing to the total items in the active category
    if (newNumberToShow >= this.state.activeCategoryItems.length) {
      newNumberToShow = this.state.activeCategoryItems.length
      showLoadMoreBtn = false
    }

    // Update the state (triggers render() + componentDidUpdate())
    this.setState({
      howManyToShow: newNumberToShow,
      showLoadMoreBtn: showLoadMoreBtn
    })
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
