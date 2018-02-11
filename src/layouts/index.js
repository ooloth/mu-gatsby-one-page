const Layout = ({ children, data }) => (
  <div>
    <Helmet
      title={data.site.siteMetadata.title}
      meta={[
        { name: 'description', content: 'Sample' },
        { name: 'keywords', content: 'sample, something' }
      ]}
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

My Imports 

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

/* 

Global Styles 

*/

switch (process.env.NODE_ENV) {
  case `development`:
    require('../styles/builds/after-postcss/main.css')
    break
  case `production`:
    require('../styles/builds/after-purgecss/main.css')
    break
}

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
