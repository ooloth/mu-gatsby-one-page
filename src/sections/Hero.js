class Hero extends Component {
  render() {
    return (
      <section className="bg-near-white pv6">
        <div className="container">
          <Greeting />
          <OperaBio />
          <WebDevBio />
          <Invitation />
        </div>
      </section>
    )
  }
}

const Greeting = () => (
  <Fragment>
    <h2
      className="sm:mb3 lh-solid f-5 sm:f-7 md:f-10 fw9 ttu"
      style={{ marginLeft: `-.051em` }}
    >
      Hello<span className="green">.</span>
    </h2>

    <h1
      className="mt4 measure-narrow lh-copy f4 sm:f3 fw4"
      style={{ maxWidth: `34ch` }}
    >
      I'm Michael Uloth, an opera singer and web developer based in Toronto.
    </h1>
  </Fragment>
)

const OperaBio = () => (
  <Fragment>
    <p className="mt4 lh-tall measure">
      As an opera singer, I've been lucky enough to perform with many wonderful opera
      companies and orchestras across Canada, the United States and Europe, including
      the Canadian Opera Company, Seattle Opera, the Glimmerglass Festival and Opéra
      de Lyon. You can see a selection of my past projects below and hear examples of
      my singing on SoundCloud and YouTube.
    </p>
  </Fragment>
)

const WebDevBio = () => (
  <Fragment>
    <p className="mt4 lh-tall measure">
      Since building my own first "I'm an opera singer" website, I've built dozens of
      sites for singers, freelancers and small businesses looking to expand their
      online profile. I love creating modern-looking layouts that load quickly and
      look great on any device. In addition to my own projects, I am also the lead
      front-end developer for Coffeeshop Creative, a web design agency based in
      Toronto.
    </p>
  </Fragment>
)

const Invitation = () => (
  <div className="mt4 flex items-center">
    <p className="flex items-baseline lh-copy f4">
      <button className="link-inline dib f4">Read more</button>
      &nbsp;or see my recent work below.
    </p>

    <span
      role="img"
      aria-label="Emoji of a finger pointing downwards"
      className="f3"
      style={{ transform: `translateY(.15em)` }}
    >
      👇
    </span>
  </div>
)

/* 
 *
 * Imports & Exports
 * 
 */

import React, { Component, Fragment } from 'react'

export default Hero
