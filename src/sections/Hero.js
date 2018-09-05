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
        TweenLite.fromTo(
          gsapTarget,
          1,
          {
            height: 0,
            autoAlpha: 0
          },
          {
            height: gsapTarget.offsetHeight,
            autoAlpha: 1,
            ease: `Power3.easeInOut`,
            // after expanding, allow height to adapt naturally when window is resized:
            onComplete: () => gsapTarget.removeAttribute(`style`)
          }
        )
      })
    }
  }

  render() {
    const { expanded } = this.state

    return (
      <section className="bg-near-white pv6 avenir">
        <OplAwardRibbon />

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

/*
 *
 * OPL Award Ribbon
 *
 */

const OplAwardRibbon = () => (
  <HyperLink
    href="https://onepagelove.com/michael-uloth"
    className="absolute top-0 right-0 mt4 pt2"
    style={{ width: `4.75rem` }}
  >
    <Ribbon className="db ml-auto w-90 sm:w-100" />
    <span className="sr-only">See this site's design award on One Page Love</span>
  </HyperLink>
)

/* 
 *
 * Greeting
 * 
 */

const Greeting = () => (
  <Fragment>
    <h2
      className="mb0 lh-solid f-5 sm:f-7 md:f-10 fw9 ttu"
      style={{ marginLeft: `-.051em` }}
    >
      Hello
      <span aria-hidden="true" className="green">
        .
      </span>
    </h2>

    <h1
      className="mt4 sm:mt3 measure-narrow lh-copy f4 sm:f3 fw4"
      style={{ maxWidth: `34ch` }}
    >
      I'm Michael Uloth, an opera singer and web developer based in Toronto.
    </h1>
  </Fragment>
)

/* 
 *
 * Opera Bio
 * 
 */

const OperaBio = () => (
  <Fragment>
    <p className="mt4 lh-tall measure">
      As an opera singer, I've been lucky enough to perform with wonderful companies
      and orchestras across Canada, the United States and Europe, including the
      Canadian Opera Company, Seattle Opera, the Glimmerglass Festival, and Opéra de
      Lyon. You can hear examples of my singing on
      {` `}
      <HyperLink
        href="https://soundcloud.com/michael-uloth/tracks"
        className="link-inline"
      >
        SoundCloud
      </HyperLink>
      ,{` `}
      <HyperLink
        href="https://youtu.be/pAketmvRsUU?t=1h21m08s"
        className="link-inline"
      >
        YouTube
      </HyperLink>
      {` `}
      and
      {` `}
      <HyperLink href="https://vimeo.com/24283716" className="link-inline">
        Vimeo
      </HyperLink>
      {` `}
      and read about my journey
      {` `}
      <HyperLink
        href="https://www.schmopera.com/spotlight-on-michael-uloth/"
        className="link-inline"
      >
        here
      </HyperLink>
      ,{` `}
      <HyperLink
        href="http://www.seattleoperablog.com/2012/03/meet-our-singers-michael-uloth-don.html"
        className="link-inline"
      >
        here
      </HyperLink>
      {` `}
      and
      {` `}
      <HyperLink
        href="https://www.kitchenerpost.ca/whatson-story/5905471-the-voice/"
        className="link-inline"
      >
        here
      </HyperLink>
      .
    </p>
  </Fragment>
)

/* 
 *
 * Web Dev Bio
 * 
 */

const WebDevBio = () => (
  <Fragment>
    <p className="mt4 lh-tall measure">
      Since building my first "I'm an opera singer" website, I've built dozens more
      sites for singers, freelancers and businesses looking to expand their online
      presence. I focus on building sexy, modern sites that load quickly. In addition
      to my own projects, I'm also the lead developer at
      {` `}
      <HyperLink href="http://coffeeshopcreative.ca/" className="link-inline">
        Coffeeshop Creative
      </HyperLink>
      , a Toronto digital design agency.
    </p>
  </Fragment>
)

/* 
 *
 * Invitation
 * 
 */

const Invitation = ({ expanded, handleClick }) => (
  <div className="flex items-center flex-wrap">
    {expanded ? <SeeWork /> : <ReadMoreOrSeeWork handleClick={handleClick} />}

    <Emoji
      emoji="👇"
      ariaLabel="Emoji of a finger pointing downwards"
      className="dib mt4 f3"
      style={{ transform: `translateY(.12em)` }}
    />
  </div>
)

/* 
 *
 * See Work
 * 
 */

const SeeWork = () => <p className="mt4 lh-copy f4">See my recent work below.</p>

/* 
 *
 * Read More or See Work
 * 
 */

const ReadMoreOrSeeWork = ({ handleClick }) => (
  <p className="dib mt4 lh-copy f4">
    <button
      onClick={handleClick}
      className="link-inline f4"
      style={{ lineHeight: 1.1 }}
    >
      Read more
    </button>
    {` `}
    or see my recent work below.
    {` `}
  </p>
)

/* 
 *
 * Imports & Exports
 * 
 */

import React, { Component, Fragment } from 'react'
import loadjs from 'loadjs'
import { ReactComponent as Ribbon } from '../svg/opl-award-ribbon-right.svg'

import Emoji from '../components/Emoji'
import HyperLink from '../components/HyperLink'

export default Hero
