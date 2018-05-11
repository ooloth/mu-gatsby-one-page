class Hero extends Component {
  state = { expanded: false }
  details = React.createRef()

  expand = () => {
    const gsapTarget = this.details.current

    if (!this.state.expanded) {
      loadjs.ready(`gsap`, () => {
        // When expanding, set this immediately
        this.setState({ expanded: true })

        // Invalidate the temporary inline styles (which match the starting state for the animation and are added to prevent a flash of content in the ending position)
        gsapTarget.removeAttribute(`style`)

        // Expand the section to its natural height
        TweenMax.fromTo(
          gsapTarget,
          1,
          {
            height: 0,
            autoAlpha: 0
          },
          {
            height: gsapTarget.offsetHeight,
            autoAlpha: 1,
            ease: Power3.easeInOut
          }
        )
      })
    }
  }

  render() {
    const { expanded } = this.state

    return (
      <section className="bg-near-white pv6">
        <div className="container">
          <Greeting />

          <div
            ref={this.details}
            className="relative z-2 overflow-hidden"
            style={{ height: 0 }}
          >
            <OperaBio />
            <WebDevBio />
          </div>

          <Invitation handleClick={this.expand} />
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

const Invitation = ({ handleClick }) => (
  <div className="mt4 flex items-center">
    <p className="flex items-baseline lh-copy f4">
      <button onClick={handleClick} className="link-inline dib f4">
        Read more
      </button>
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
import loadjs from 'loadjs'

export default Hero
