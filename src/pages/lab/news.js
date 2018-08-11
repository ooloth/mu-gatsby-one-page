const NewsPage = () => (
  <Fragment>
    <main className="avenir" style={{ minHeight: `calc(100vh - 36px)` }}>
      <LabHero title="News" description="Daily news without the noise." />

      <NewsApp />
    </main>

    <Footer />
  </Fragment>
)

const NewsApp = () => (
  <section className="container pv5">
    <BackToLab />
  </section>
)

import React, { Fragment } from 'react'

import LabHero from '../../components/lab/LabHero'
import BackToLab from '../../components/lab/BackToLab'
import Footer from '../../sections/Footer'

export default NewsPage
