function Hero() {
  const [expanded, setExpanded] = useState(false)
  const bios = useRef()

  function expand() {
    const gsapTarget = bios.current

    if (!expanded) {
      loadjs.ready(`gsap`, () => {
        // When expanding, set this immediately
        setExpanded(true)

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

  return (
    <section className="bg-near-white pv6 avenir">
      <OplAwardRibbon />

      <div className="container">
        <Greeting />

        <div
          ref={bios}
          className="relative z-2 overflow-hidden"
          style={{ height: 0 }}
        >
          <OperaBio />
          <WebDevBio />
        </div>

        <Invitation expanded={expanded} handleClick={expand} />
      </div>
    </section>
  )
}

///////////////////////////////////////////////////////////////////////////////////

function OplAwardRibbon() {
  return (
    <Link
      href="https://onepagelove.com/michael-uloth"
      className="absolute top-0 right-0 mt4 pt2"
      style={{ width: `4.75rem` }}
    >
      <Ribbon className="db ml-auto w-90 sm:w-100" />
      <span className="sr-only">
        See this site's design award on One Page Love
      </span>
    </Link>
  )
}

///////////////////////////////////////////////////////////////////////////////////

function Greeting() {
  return (
    <>
      <h2 className="page-heading">
        Hello
        <span aria-hidden="true" className="green">
          .
        </span>
      </h2>

      <h1
        className="mt4 measure-narrow lh-copy f4 sm:f3 fw4"
        style={{ maxWidth: `40ch` }}
      >
        I'm Michael Uloth, an opera singer, web&nbsp;developer and creator of{' '}
        <Link href="https://www.upandrunningtutorials.com" className="link-inline">
          Up&nbsp;and&nbsp;Running Tutorials
        </Link>
        .
      </h1>
    </>
  )
}

///////////////////////////////////////////////////////////////////////////////////

function Invitation({ expanded, handleClick }) {
  return (
    <div className="flex items-center flex-wrap">
      {expanded ? <SeeWork /> : <ReadMoreOrSeeWork handleClick={handleClick} />}

      <Emoji
        emoji="👇"
        ariaLabel="Emoji of a finger pointing downwards"
        className="dib mt4 pt1 sm:pt2 f3"
        style={{ transform: `translateY(.12em)` }}
      />
    </div>
  )
}

///////////////////////////////////////////////////////////////////////////////////

function SeeWork() {
  return <p className="mt4 pt1 sm:pt2 lh-copy f4">See my recent work below.</p>
}

///////////////////////////////////////////////////////////////////////////////////

function ReadMoreOrSeeWork({ handleClick }) {
  return (
    <p className="dib mt4 pt1 sm:pt2 lh-copy f4">
      <button
        onClick={handleClick}
        className="link-inline f4"
        style={{ lineHeight: 1.3 }}
      >
        Read more
      </button>
      {` `}
      or see my recent work below.
      {` `}
    </p>
  )
}

///////////////////////////////////////////////////////////////////////////////////

function OperaBio() {
  return (
    <p className="mt4 lh-tall measure">
      As an opera singer, I've been lucky enough to perform with wonderful
      companies and orchestras across Canada, the United States and Europe,
      including the Canadian Opera Company, Seattle Opera, the Glimmerglass
      Festival, and Opéra de Lyon. You can hear examples of my singing on
      {` `}
      <Link
        href="https://soundcloud.com/michael-uloth/tracks"
        className="link-inline"
      >
        SoundCloud
      </Link>
      ,{` `}
      <Link href="https://youtu.be/pAketmvRsUU?t=1h21m08s" className="link-inline">
        YouTube
      </Link>
      {` `}
      and
      {` `}
      <Link href="https://vimeo.com/24283716" className="link-inline">
        Vimeo
      </Link>
      {` `}
      and read about my journey
      {` `}
      <Link
        href="https://www.schmopera.com/spotlight-on-michael-uloth/"
        className="link-inline"
      >
        here
      </Link>
      ,{` `}
      <Link
        href="http://www.seattleoperablog.com/2012/03/meet-our-singers-michael-uloth-don.html"
        className="link-inline"
      >
        here
      </Link>
      {` `}
      and
      {` `}
      <Link
        href="https://www.kitchenerpost.ca/whatson-story/5905471-the-voice/"
        className="link-inline"
      >
        here
      </Link>
      .
    </p>
  )
}

///////////////////////////////////////////////////////////////////////////////////

function WebDevBio() {
  return (
    <p className="mt4 lh-tall measure">
      Since teaching myself to code, I've spent four years building 35+ client
      sites and guiding them to production. I specialize in building fast-loading
      sites with{` `}
      <Link href="https://reactjs.org" className="link-inline">
        React
      </Link>{' '}
      and{` `}
      <Link href="https://www.gatsbyjs.org" className="link-inline">
        Gatsby
      </Link>
      , but always enjoy learning new technologies as well. In addition to
      designing and building my own projects, I'm the lead front-end developer at
      {` `}
      <Link href="http://coffeeshopcreative.ca" className="link-inline">
        Coffeeshop Creative
      </Link>
      {` `} and the creator of
      {` `}
      <Link href="https://www.upandrunningtutorials.com" className="link-inline">
        Up&nbsp;&&nbsp;Running Tutorials
      </Link>
      .
    </p>
  )
}

///////////////////////////////////////////////////////////////////////////////////

import React, { useState, useRef } from 'react'
import loadjs from 'loadjs'
import { ReactComponent as Ribbon } from '../svg/opl-award-ribbon-right.svg'

import Emoji from '../components/Emoji'
import Link from '../components/Link'

export default Hero
