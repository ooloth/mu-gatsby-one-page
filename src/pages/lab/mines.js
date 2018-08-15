const MinesPage = () => (
  <Base>
    {/* <PageMetadata page={data.metadata.siteMetadata.minesPage} /> */}

    <main className="avenir" style={{ minHeight: `calc(100vh - 36px)` }}>
      <LabHero title="Mines" description="Sexy Minesweeper." />

      <MinesApp />
    </main>

    <Footer />
  </Base>
)

const MinesApp = () => (
  <section className="container pv5">
    <BackToLab />
  </section>
)

import React, { Fragment } from 'react'

import Base from '../../components/Base'
// import PageMetadata from '../../components/PageMetadata'

import LabHero from '../../components/lab/LabHero'
import BackToLab from '../../components/lab/BackToLab'
import Footer from '../../sections/Footer'

export default MinesPage
