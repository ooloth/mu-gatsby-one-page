const IndexPage = ({ data }) => (
  <div className="relative vh-100">
    <main className="flex flex-column justify-center items-center pa3 h-100 avenir">
      <h1
        className="lh-solid fw9 ttu"
        style={{
          fontSize: `calc( (1vw + 1vh + .5vmin) * 9 )`,
          textShadow: `6px 6px 5px rgba(0,0,0,0.1)`
        }}
      >
        Hello
      </h1>
      <p className="pt3 pb4 tc lh-tall f4">
        I'm Michael. I’m an opera singer and web developer. <br className="dn sm:di" />How&nbsp;can&nbsp;I&nbsp;help?
      </p>
      {/* <p className="pt3 pb4 tc lh-tall f4">
      I'm Michael. I sing opera and build websites. <br className="dn sm:di" />How&nbsp;can&nbsp;I&nbsp;help?
    </p> */}
      <nav className="flex pb4">
        <Link to="/opera/" className="link">
          Opera
        </Link>
        <Link to="/websites/" className="link ml3 sm:ml4">
          Websites
        </Link>
      </nav>

      {/* <h1 className="bg-orange-lighter py-4">My Website (Gatsby testing phase...)</h1>
    <Link to="/page-2/">Go to page 2</Link>
    <ImageTests sizes={data.placeholderImage.sizes} />
    <ReactSlick sizes={data.placeholderImage.sizes} />
    <ReactIDSwiper sizes={data.placeholderImage.sizes} />
    <IsotopeTests sizes={data.placeholderImage.sizes} /> */}
      {/* <ScrollRevealTests sizes={data.placeholderImage.sizes} /> */}
      {/* <ScrollRevealTest2 sizes={data.placeholderImage.sizes} />
    <Chat />
    <Opera />
    <Websites /> */}
    </main>
    <Footer className="absolute bottom-0 w-100 tc" />
  </div>
)

export default IndexPage

/*
 *
 * Imports
 * 
 */

import React from 'react'
import Aux from 'react-aux'
import Link from 'gatsby-link'

import Footer from '../components/Footer'

/*
 *
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * Old Stuff...
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * TODO: save these as reusable components for later...
 * 
 */

import theme from '../styles/tailwind.config'
console.log(`Tailwind colors: ${theme.colors.black}`)

/* Gatsby-Image Tests */

import Image from 'gatsby-image'

const ImageTests = props => (
  <section className="py-5">
    <h2 className="pb-2">Gatsby-Image Test (Blur Up)</h2>
    <Image sizes={props.sizes} />
  </section>
)

/* React-Slick Tests */

import Slick from 'react-slick'

class ReactSlick extends React.Component {
  render() {
    const settings = {
      dots: true,
      arrows: true, // to see arrows, disable slick-theme.css (the arrows are offscreen)
      infinite: true,
      autoplay: true,
      speed: 600,
      slidesToShow: 1,
      slidesToScroll: 1
    }
    return (
      <div className="bg-blue-lightest py-5">
        <h2 className="pb-2">React-Slick Test</h2>
        <div className="mx-auto w-50">
          <Slick {...settings}>
            <figure>
              <Image sizes={this.props.sizes} />
            </figure>
            <figure>
              <Image sizes={this.props.sizes} />
            </figure>
            <figure>
              <Image sizes={this.props.sizes} />
            </figure>
          </Slick>
        </div>
      </div>
    )
  }
}

/*

React ID Slider (Swiper wrapper) Test

- Docs: https://github.com/kidjp85/react-id-swiper
- Demos: http://kidjp85.github.io/react-id-swiper/

- TIP: to make slides equal height, override .swiper-slide {height: 100%;} with .swiper-slide {height: auto;}
- see: https://github.com/nolimits4web/Swiper/issues/2372

*/

import Swiper from 'react-id-swiper'

const ReactIDSwiper = props => (
  <section className="py-5">
    <h2 className="pb-2">React-ID-Slider Test (Swiper wrapper)</h2>
    <SwiperwithThumbnails sizes={props.sizes} />
  </section>
)

class SwiperwithThumbnails extends React.Component {
  /* Only needed when there is a thumbnail slider */
  state = {
    gallerySwiper: null,
    thumbnailSwiper: null
  }

  /* Only needed when there is a thumbnail slider */
  componentWillUpdate(nextProps, nextState) {
    if (nextState.gallerySwiper && nextState.thumbnailSwiper) {
      const { gallerySwiper, thumbnailSwiper } = nextState

      gallerySwiper.controller.control = thumbnailSwiper
      thumbnailSwiper.controller.control = gallerySwiper
    }
  }

  /* Only needed when there is a thumbnail slider */
  galleryRef = ref => {
    if (ref) this.setState({ gallerySwiper: ref.swiper })
  }

  /* Only needed when there is a thumbnail slider */
  thumbRef = ref => {
    if (ref) this.setState({ thumbnailSwiper: ref.swiper })
  }

  render() {
    const gallerySwiperParams = {
      spaceBetween: 10,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      },
      speed: 600,
      keyboard: true
    }

    const thumbnailSwiperParams = {
      slideClass: 'swiper-nav-slide',
      spaceBetween: 10,
      centeredSlides: true,
      slidesPerView: 4,
      touchRatio: 0.2,
      slideToClickedSlide: true,
      speed: 600,
      keyboard: true
    }

    return (
      <div className="mx-auto w-50">
        <Swiper {...gallerySwiperParams} ref={this.galleryRef}>
          <figure>
            <Image sizes={this.props.sizes} />
          </figure>
          <figure>
            <Image sizes={this.props.sizes} />
          </figure>
          <figure>
            <Image sizes={this.props.sizes} />
          </figure>
          <figure>
            <Image sizes={this.props.sizes} />
          </figure>
        </Swiper>
        <Swiper {...thumbnailSwiperParams} ref={this.thumbRef}>
          <figure className="w-25">
            <Image sizes={this.props.sizes} />
          </figure>
          <figure className="w-25">
            <Image sizes={this.props.sizes} />
          </figure>
          <figure className="w-25">
            <Image sizes={this.props.sizes} />
          </figure>
          <figure className="w-25">
            <Image sizes={this.props.sizes} />
          </figure>
        </Swiper>
      </div>
    )
  }
}

/* 

Isotope Test (with filtering + "load more")

- to explain how this setup works, see Hubert's answer here: https://stackoverflow.com/questions/25135261/react-js-and-isotope-js/29866950

- as an alternative, use: https://github.com/eiriklv/react-masonry-component
 
*/

import Isotope from 'isotope-layout'

const IsotopeTests = props => (
  <section className="py-5">
    <h2 className="py-2">Isotope Test</h2>
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

// TODO: use data-attributes instead of classs as JS hooks
const FilterButtons = props => (
  <div className="js-filter-buttons">
    <button
      onClick={category => props.handleFilter((category = 'all'))}
      className="js-filter-button m-2"
    >
      All
    </button>
    <button
      onClick={category => props.handleFilter((category = 'category-1'))}
      className="js-filter-button m-2"
    >
      Category 1
    </button>
    <button
      onClick={category => props.handleFilter((category = 'category-2'))}
      className="js-filter-button m-2"
    >
      Category 2
    </button>
  </div>
)

// Isotope Container (logic for initialization + filtering + "load more")
class IsotopeContainer extends React.Component {
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
        isotope: new Isotope(this.node, { filter: `.visible` })
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

  render() {
    // Update classes on each Isotope item (to show the right category and # of items)

    let counter = 0
    // console.log(`category`, category)

    const allItemsWithClassesUpdated = this.state.allItems.map(item => {
      // Add "visible" class if item is right category and # limit hasn't been reached
      if (
        (this.state.category === `.all` ||
          item.category === this.state.category.substring(1)) &&
        counter < this.state.howManyToShow
      ) {
        const classList = item.classes.replace(`hidden`, `visible`)
        item.classes = classList
        counter++

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
}

/*

ScrollReveal Tests

- see solution from owner on GitHub: https://github.com/jlmakes/scrollreveal/issues/218
- see his demo: https://codesandbox.io/s/z2wqk3vm1l

*/

import { findDOMNode } from 'react-dom'
import ScrollReveal from 'scrollreveal'

// Stateless functional component won't have refs.
// https://reactjs.org/docs/refs-and-the-dom.html#refs-and-functional-components

// const Item = ({ content }) => <li>{content}</li> // doesn’t work!

// class Item extends React.Component {
//   render() {
//     return <li>{this.props.content}</li>
//   }
// }

// const List = ({ children }) => (
//   <div>
//     <h3>List:</h3>
//     {children}
//   </div>
// )

// // ScrollReveal HOC
// const WithScrollReveal = WrappedComponent =>
//   class extends React.Component {
//     // constructor(props) {
//     //   super(props)
//     //   this.target = []
//     // }
//     // componentDidMount() {
//     //   ScrollReveal().reveal(this.target, this.props.options, this.props.interval)
//     // }
//     componentWillUnmount() {
//       ScrollReveal().clean(this.childNodes)
//     }
//     // render() {
//     //   const children = React.Children.map(this.props.children, child =>
//     //     React.cloneElement(child, {
//     //       ref: c => this.target.push(findDOMNode(c))
//     //     })
//     //   )
//     //   return <WrappedComponent {...this.props}>{children}</WrappedComponent>
//     // }

//     bindRef(c) {
//       this.component = c
//     }

//     componentDidMount() {
//       const domElement = findDOMNode(this.component)
//       ScrollReveal().reveal(domElement, this.props.options, this.props.interval)
//     }

//     render() {
//       const that = this
//       return (
//         <WrappedComponent
//           {...this.props}
//           ref={function(c) {
//             that.bindRef(c)
//           }}
//         />
//       )
//     }
//   }

// const RevealedList = WithScrollReveal(List)

// const ScrollRevealTests = () => (
//   <section className="bg-near-white pv5">
//     <h2>ScrollReveal Test</h2>
//     <RevealedList options={{ distance: '50px' }} interval={500}>
//       <Item content="foo" />
//       <Item content="bar" />
//       <Item content="jam" />
//     </RevealedList>
//   </section>
// )

/*

ScrollReveal Test #2

- see the code that worked in the end: https://andrewshiau.wordpress.com/2017/04/02/use-scrollreveal-js-on-a-react-component/

- see solution from owner on GitHub (didn't work for me...): https://github.com/jlmakes/scrollreveal/issues/218
- see his demo: https://codesandbox.io/s/z2wqk3vm1l

*/

const ScrollRevealTest2 = props => (
  <section className="bg-yellow-lighter py-5">
    <h2 className="mb-2">ScrollReveal Test #2</h2>
    <RevealedComponent
      sizes={props.sizes}
      options={{
        delay: '0',
        duration: '1000',
        distance: '40px',
        reset: false
      }}
      interval={0}
    />
  </section>
)

// HOC for ScrollReveal: wrap the components to reveal like this: reveal(MyComponent)
const reveal = WrappedComponent => {
  return class RevealEnhancer extends React.Component {
    bindRef(c) {
      this.component = c
    }

    componentDidMount() {
      const domElement = findDOMNode(this.component)
      console.log(`options`, this.props.options)
      ScrollReveal().reveal(domElement, this.props.options, this.props.interval)
    }

    render() {
      const that = this
      return (
        <WrappedComponent
          {...this.props}
          ref={function(c) {
            that.bindRef(c)
          }}
        />
      )
    }
  }
}

class MyComponent extends React.Component {
  render() {
    return (
      <div className="mx-auto w-75">
        <Image sizes={this.props.sizes} />
      </div>
    )
  }
}

const RevealedComponent = reveal(MyComponent)

/*

React ScrollReveal Test

*/

// import withScrollReveal from 'react-scrollreveal'

// const ReactScrollRevealTests = props => (
//   <div>
//     <h2>React ScrollReveal Test</h2>
//     <FlyingImages sizes={props.sizes} />
//   </div>
// )

// const Images = props => (
//   <div className="flex-ns" ref={props.animationContainerReference}>
//     <div className="sr-item--sequence w-third-ns">
//       <Image sizes={props.sizes} />
//     </div>
//     <div className="sr-item--sequence w-third-ns">
//       <Image sizes={props.sizes} />
//     </div>
//     <div className="sr-item--sequence w-third-ns">
//       <Image sizes={props.sizes} />
//     </div>
//   </div>
// )

// const FlyingImages = withScrollReveal([
//   {
//     selector: '.sr-item',
//     options: {
//       reset: true
//     }
//   },
//   {
//     selector: '.sr-item--sequence',
//     options: {
//       reset: true,
//       delay: 400
//     },
//     interval: 100
//   }
// ])(Images)

/*

Chatbot

*/

import ChatBot from 'react-simple-chatbot'

const Chat = props => (
  <section className="py-5 h-full">
    <h2 className="mb-3">ChatBot!</h2>
    <ChatBot
      botDelay={900}
      bubbleStyle={bubbleStyle}
      className=""
      customDelay={500}
      customStyle={{}}
      footerStyle={{ display: `none` }}
      hideBotAvatar={true}
      hideHeader={true}
      hideSubmitButton={true}
      hideUserAvatar={true}
      style={rootStyle}
      userDelay={200}
      steps={steps}
    />
  </section>
)

// see: https://github.com/LucasBassetti/react-simple-chatbot/pull/10
// ChatBotContainer.defaultProps = {
// 	theme: {
// 		background: '#f5f8fb'
// 	}
// }

const rootStyle = { margin: `0 auto`, width: `90%`, height: `90vh`, fontFamily: `inherit` }

const bubbleStyle = {
  animationDuration: `.7s`,
  boxShadow: `0px 1px 1px rgba(0, 0, 0, 0.2)`,
  outline: `none`,
  border: `none`,
  borderRadius: `3px`,
  // backgroundColor: `white`,
  padding: `6px 12px`,
  // maxWidth: `90%`,
  // minWidth: `44px`,
  // minHeight: `12px`,
  lineHeight: `1.45em`,
  // fontFamily: `inherit`,
  fontFeatureSettings: `'liga' 1, 'onum' 1, 'kern' 1`,
  fontSize: `19px`
  // color: `#222`
}

const steps = [
  {
    id: '1',
    message: 'What number I am thinking?',
    trigger: '2'
  },
  {
    id: '2',
    options: [
      { value: 1, label: 'Number 1', trigger: '4' },
      { value: 2, label: 'Number 2', trigger: '3' },
      { value: 3, label: 'Number 3', trigger: '3' }
    ]
  },
  {
    id: '3',
    message: 'Wrong answer, try again.',
    trigger: '2'
  },
  {
    id: '4',
    message: 'Awesome! You are a telepath!',
    end: true
  }
]

/* 

Opera content

*/

import placeholder from '../images/placeholder.jpg'

const Opera = () => {
  return (
    <section className="mx-auto max-w-9 py-5 text-left">
      <h2>Opera Stuff</h2>
      <h3>About Me</h3>
      <p className="max-w-8 leading-normal">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit, consequatur deserunt.
        Delectus pariatur error soluta. Repellendus natus odio consequatur veniam pariatur
        eaque amet debitis odit obcaecati, sapiente expedita, dicta harum.
      </p>
      <h3>Work</h3>
      <p className="max-w-8 leading-normal">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit, consequatur deserunt.
      </p>
      <ul className="list-reset">
        <li className="grid-opera">
          <img src={placeholder} alt="" className="block shadow-lg" />
          <h4 className="pt-4 text-2xl">Canadian Opera Company</h4>
          <ul className="list-reset leading-normal">
            <li>Role in Opera (Composer)</li>
            <li>Role in Opera (Composer)</li>
            <li>Role in Opera (Composer)</li>
            <li>Role in Opera (Composer)</li>
            <li>Role in Opera (Composer)</li>
          </ul>
        </li>

        <li className="grid-opera">
          <img src={placeholder} alt="" className="block shadow-lg" />
          <h4>Canadian Opera Company</h4>
          <ul className="list-reset">
            <li>Role in Composer's Opera</li>
            <li>Role in Opera (Composer)</li>
          </ul>
        </li>

        <li className="grid-opera">
          <img src={placeholder} alt="" className="block shadow-lg" />
          <h4>Canadian Opera Company</h4>
          <ul className="list-reset">li</ul>
        </li>

        <li className="grid-opera">
          <img src={placeholder} alt="" className="block shadow-lg" />
          <h4>Canadian Opera Company</h4>
          <ul className="list-reset">li</ul>
        </li>
      </ul>
      <a href="#">Show all</a>
      <h3>Reviews</h3>
      <h3>Listen</h3>
      <h3>Contact</h3>
    </section>
  )
}

/* 

Opera content

*/

const Websites = () => {
  return (
    <section className="py-5 text-left">
      <h2>Website Stuff</h2>
    </section>
  )
}

/* 

Index Page Queries

*/

export const query = graphql`
  query IndexPageQuery {
    placeholderImage: imageSharp(id: { regex: "/placeholder/" }) {
      sizes(maxWidth: 5000) {
        ...GatsbyImageSharpSizes_withWebp
      }
    }
  }
`
