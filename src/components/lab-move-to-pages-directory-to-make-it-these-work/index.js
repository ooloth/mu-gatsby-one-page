const LabPage = () => (
  <Base>
    {/* <PageMetadata page={data.metadata.siteMetadata.labPage} /> */}

    <main className="avenir" style={{ minHeight: `calc(100vh - 36px)` }}>
      <LabHero title="Lab" description="Experiments with app-building." />

      <PageLinks />
    </main>

    <Footer />
  </Base>
)

// TODO: add some kind of image/icon to go with each link (turn links into squares with an image/icon, title, and maybe a one-line description)
const PageLinks = () => (
  <section className="container pv5">
    <ul className="flex flex-wrap nl4 nt4">
      {labLinks.map((link, i) => (
        <li key={i} className="pl4 pt4 w-100 sm:w-50 md:w-third">
          <Link
            to={`/lab/${link}/`}
            className="db shadow-lg bg-green pa3 tc f4 fw9 ttc animate hover:bg-black hover:white"
          >
            {link}
          </Link>
        </li>
      ))}
    </ul>
  </section>
)

const labLinks = [`cards`, `mines`, `moves`, `news`, `nines`, `odds`]

/*
 *
 * Imports & Exports
 *
 */

import React, { Fragment } from 'react'
import { Link } from 'gatsby'

import Base from '../../components/Base'
// import PageMetadata from '../../components/PageMetadata'

import LabHero from '../../components/lab/LabHero'
import Footer from '../../sections/Footer'

export default LabPage
