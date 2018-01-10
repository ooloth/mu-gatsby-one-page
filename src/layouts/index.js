import { injectGlobal } from 'styled-components'

// Global styles
injectGlobal`
// ...
`

import React from 'react'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'
import Helmet from 'react-helmet'
import styled from 'styled-components'

// Import open-source fonts from Typefaces (includes @font-face automatically)
// import 'typeface-playfair-display'

// Import other fonts (need to include my own @font-face declaration)
// import '../fonts/Avenir-Pro-45-Book.woff2'
// import '../fonts/Avenir-Pro-45-Book.woff'
// import '../fonts/Avenir-Pro-85-Heavy.woff2'
// import '../fonts/Avenir-Pro-85-Heavy.woff'
// import './font-face.css'

// import Header from '../components/Header'
// import Footer from '../components/Footer'

import '../../node_modules/tachyons/css/tachyons.min.css'
// import './index.css'

const Layout = ({ children, data }) => (
  <div className="bg-yellow">
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

// Query sitewide metadata
export const query = graphql`
  query LayoutQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`
