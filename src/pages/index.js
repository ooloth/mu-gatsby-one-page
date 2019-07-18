const IndexPage = () => {
  const operas = useOperaData()
  const websites = useWebsitesData()

  // Merge operas and websites in an alternating pattern
  let projects = []
  for (let i = 0; i < operas.length + websites.length; i++) {
    if (operas[i] && websites[i]) projects.push(operas[i], websites[i])
    else if (operas[i]) projects.push(operas[i])
    else if (websites[i]) projects.push(websites[i])
    else break
  }

  return (
    <Base>
      <main>
        <Hero />
        <Work projects={projects} />
        <Contact />
      </main>

      <Footer className="bg-near-white" />
    </Base>
  )
}

///////////////////////////////////////////////////////////////////////////////////

import React from 'react'

import Base from '../components/Base'
import Hero from '../sections/Hero'
import Work from '../sections/Work'
import Contact from '../sections/Contact'
import Footer from '../sections/Footer'
import useOperaData from '../queries/useOperaData'
import useWebsitesData from '../queries/useWebsitesData'

export default IndexPage
