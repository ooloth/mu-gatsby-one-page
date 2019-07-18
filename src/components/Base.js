function Base({ children }) {
  return (
    <>
      <Metadata
        preload={[
          { href: avenirRegular, as: `font`, type: `font/woff2` },
          { href: avenirHeavy, as: `font`, type: `font/woff2` }
        ]}
        preconnect={[
          `https://cdnjs.cloudflare.com`,
          `https://www.jsdelivr.com`,
          `https://cdn.jsdelivr.net`,
          `https://www.google-analytics.com`
        ]}
      />
      {children}
    </>
  )
}

///////////////////////////////////////////////////////////////////////////////////

import React from 'react'

import Metadata from '../components/Metadata'
import avenirRegular from '../fonts/AvenirNextLTPro-Regular.woff2'
import avenirHeavy from '../fonts/AvenirNextLTPro-Heavy.woff2'
import '../styles/index.css'

export default Base
