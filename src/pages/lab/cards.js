const CardsPage = () => (
  <Fragment>
    <main className="avenir" style={{ minHeight: `calc(100vh - 36px)` }}>
      <LabHero
        title="Cards"
        description="Learn anything using flashcards and spaced repetition."
      />

      <CardsApp />
    </main>

    <Footer />
  </Fragment>
)

const CardsApp = () => (
  <section className="container pv5">
    <BackToLab />
  </section>
)

import React, { Fragment } from 'react'

import LabHero from '../../components/lab/LabHero'
import BackToLab from '../../components/lab/BackToLab'
import Footer from '../../sections/Footer'

export default CardsPage
