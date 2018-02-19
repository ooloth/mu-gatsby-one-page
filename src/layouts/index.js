const TemplateWrapper = ({ children }) => (
  <div>
    <Helmet
      title="Michael Uloth"
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

TemplateWrapper.propTypes = {
  children: PropTypes.func
}

export default TemplateWrapper

/*
 *
 * Imports
 * 
 */

import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'

// import Header from '../components/Header'
// import Footer from '../components/Footer'

//- Import styles (PurgeCSS version in production)
switch (process.env.NODE_ENV) {
  case `development`:
    require('../styles/builds/after-postcss/output.css')
    break
  case `production`:
    require('../styles/builds/after-purgecss/output.css')
    break
}
