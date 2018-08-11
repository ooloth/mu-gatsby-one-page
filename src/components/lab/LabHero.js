const LabHero = ({ title, description }) => (
  <section className="bg-near-white pv5">
    <div className="container">
      <h1
        className="lh-solid f-5 sm:f-7 md:f-10 fw9"
        style={{ marginLeft: `-.06em` }}
      >
        {title}
        <span className="green">.</span>
      </h1>

      <p className="pt4 sm:mt3 measure-narrow lh-copy f4 sm:f3 fw4">{description}</p>
    </div>
  </section>
)

/*
 *
 * Imports & Exports
 *
 */

import React from 'react'

export default LabHero
