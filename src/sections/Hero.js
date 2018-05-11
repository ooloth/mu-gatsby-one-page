class Hero extends Component {
  state = { expanded: false }
  bios = React.createRef()

  expand = () => {
    const gsapTarget = this.bios.current

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
            ease: `Power3.easeInOut`
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
            ref={this.bios}
            className="relative z-2 overflow-hidden"
            style={{ height: 0 }}
          >
            <OperaBio />
            <WebDevBio />
          </div>

          <Invitation expanded={expanded} handleClick={this.expand} />
        </div>
      </section>
    )
  }
}

const Greeting = () => (
  <Fragment>
    <h2
      className="mb0 lh-solid f-5 sm:f-7 md:f-10 fw9 ttu"
      style={{ marginLeft: `-.051em` }}
    >
      Hello<span className="green">.</span>
    </h2>

    <h1
      className="mt4 sm:mt3 measure-narrow lh-copy f4 sm:f3 fw4"
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
      my singing on{` `}
      <HyperLink
        href="https://soundcloud.com/michael-uloth/tracks"
        className="link-inline"
      >
        SoundCloud
      </HyperLink>
      {` `}
      and{` `}
      <HyperLink
        href="https://youtu.be/pAketmvRsUU?t=1h21m08s"
        className="link-inline"
      >
        YouTube
      </HyperLink>.
    </p>
  </Fragment>
)

const WebDevBio = () => (
  <Fragment>
    <p className="mt4 lh-tall measure">
      Since building my own first "I'm an opera singer" website, I've built dozens of
      sites for singers, freelancers and small businesses looking to expand their
      online profiles. I love creating sites that look modern and load quickly on any
      device. When I'm not working on my own projects, I'm also the lead front-end
      developer for Coffeeshop Creative, a web design agency based in Toronto.
    </p>
  </Fragment>
)

const Invitation = ({ expanded, handleClick }) => (
  <div className="flex items-center flex-wrap">
    {expanded ? <SeeWork /> : <ReadMoreOrSeeWork handleClick={handleClick} />}

    <PointingDownEmoji />
  </div>
)

const SeeWork = () => <p className="mt4 lh-copy f4">See my recent work below.</p>

const ReadMoreOrSeeWork = ({ handleClick }) => (
  <p className="dib mt4 lh-copy f4">
    <button onClick={handleClick} className="link-inline dib f4">
      Read more
    </button>
    &nbsp;or see my recent work below.
  </p>
)

const PointingDownEmoji = () => (
  <span
    role="img"
    aria-label="Emoji of a finger pointing downwards"
    className="dib mt4 f3"
    style={{ transform: `translateY(.12em)` }}
  >
    👇
  </span>
)

/* 
 *
 * Imports & Exports
 * 
 */

import React, { Component, Fragment } from 'react'
import loadjs from 'loadjs'

import HyperLink from '../components/HyperLink'

export default Hero
