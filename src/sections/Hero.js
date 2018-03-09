const Hero = () => (
  <section class="bg-near-white pv6">
    <div class="container">
      <h2
        class="mb4 sm:mb3 lh-solid f-5 sm:f-7 md:f-10 fw9 ttu"
        style={{ marginLeft: `-.051em` }}
      >
        Hello<span class="green">.</span>
      </h2>
      <h1 class="mb4 measure-narrow lh-copy f4 sm:f3 fw4" style={{ maxWidth: `34ch` }}>
        I'm Michael Uloth, an opera singer and web developer based in Toronto.
      </h1>
      <p class="flex lh-copy f4">
        See my recent work below.<span aria-hidden="true" class="f3">
          👇
        </span>
      </p>
    </div>
  </section>
)

export default Hero

/* 
 *
 * Imports
 * 
 */

import React from 'react'
