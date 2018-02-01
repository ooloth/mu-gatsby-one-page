const Layout = ({ children, data }) => (
  <div>
    <Helmet
      title={data.site.siteMetadata.title}
      meta={[{ name: 'description', content: 'Sample' }, { name: 'keywords', content: 'sample, something' }]}
    />
    {/* <Header /> */}
    {children()}
    {/* <Footer /> */}
  </div>
)

Layout.propTypes = {
  children: PropTypes.func,
  data: PropTypes.object
}

export default Layout

/* 

Vendor Imports 

*/

import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import Link from 'gatsby-link'

/* 

Custom Imports 

*/

// import Header from '../components/Header'
// import Footer from '../components/Footer'

/* 

Global Fonts 

*/

// Import open-source fonts from Typefaces (includes @font-face automatically)
// import 'typeface-playfair-display'

// Import other fonts (need to include my own @font-face declaration)
// import '../fonts/Avenir-Pro-45-Book.woff2'
// import '../fonts/Avenir-Pro-45-Book.woff'
// import '../fonts/Avenir-Pro-85-Heavy.woff2'
// import '../fonts/Avenir-Pro-85-Heavy.woff'
// import '../styles/font-face.css'

/* 

Global Styles 

*/

// TODO: move these plugin style calls to tailwind.css once postCSS processing is working
// import '../../node_modules/slick-carousel/slick/slick.css'
// import '../../node_modules/slick-carousel/slick/slick-theme.css'

import '../styles/styles.scss'

/* 

Global Queries 

*/

export const query = graphql`
  query LayoutQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`
