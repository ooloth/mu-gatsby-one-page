const NinesPage = () => (
  <Fragment>
    <main className="avenir" style={{ minHeight: `calc(100vh - 36px)` }}>
      <LabHero title="Nines" description="Sexy Sudoku." />

      <NinesApp />
    </main>

    <Footer />
  </Fragment>
)

const NinesApp = () => (
  <section className="container pv5">
    <BackToLab />
  </section>
)

import React, { Fragment } from 'react'

import LabHero from '../../components/lab/LabHero'
import BackToLab from '../../components/lab/BackToLab'
import Footer from '../../sections/Footer'

export default NinesPage
