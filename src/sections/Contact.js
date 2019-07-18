function Contact() {
  return (
    <section className="bg-near-white pv6 avenir">
      <div className="container">
        <Invitation />
        <ContactLinks />
      </div>
    </section>
  )
}

///////////////////////////////////////////////////////////////////////////////////

function Invitation() {
  return (
    <Fragment>
      <h2
        className="mb4 lh-solid f-3p5 sm:f-5 md:f-6 fw9 ttu"
        style={{
          marginLeft: `-.03em`
        }}
      >
        Contact
        <span aria-hidden="true" className="green">
          .
        </span>
      </h2>

      <p
        className="mb4 pb3 measure-narrow lh-copy f4 sm:f3 fw4"
        style={{ maxWidth: `32ch` }}
      >
        Want to work together? Tell me about your project!
        {` `}
        <Emoji emoji="👋" ariaLabel="Emoji of a hand waving" />
      </p>
    </Fragment>
  )
}

///////////////////////////////////////////////////////////////////////////////////

function ContactLinks() {
  return (
    <div className="sm:flex sm:items-center">
      <Link
        href="mailto:hello@michaeluloth.com"
        className="link dib mr3 mb4 sm:mb0"
      >
        Email me
      </Link>

      <SocialLinks />
    </div>
  )
}

///////////////////////////////////////////////////////////////////////////////////

function SocialLinks() {
  return (
    <nav aria-label="Social media links" className="">
      <ul>
        {links.map(link => {
          return (
            <li key={link.name} className="dib mr3 f3">
              <Link
                href={link.url}
                className="icon"
                srText={`Follow me on ${link.name}`}
              >
                {link.icon}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

const links = [
  {
    name: `Twitter`,
    icon: (
      <TwitterSVG
        style={{ width: `1.608rem`, height: `1.5rem`, verticalAlign: `middle` }}
      />
    ),
    url: `https://twitter.com/ooloth`
  },
  {
    name: `LinkedIn`,
    icon: (
      <LinkedInSVG
        style={{ width: `1.608rem`, height: `1.5rem`, verticalAlign: `middle` }}
      />
    ),
    url: `https://www.linkedin.com/in/michael-uloth-848a1b98/`
  },
  {
    name: `GitHub`,
    icon: (
      <GitHubSVG
        style={{ width: `1.608rem`, height: `1.5rem`, verticalAlign: `middle` }}
      />
    ),
    url: `https://github.com/ooloth`
  },
  {
    name: `Facebook`,
    icon: (
      <FacebookSVG
        style={{
          width: `1.608rem`,
          height: `1.5rem`,
          verticalAlign: `middle`,
          padding: `.035rem 0`
        }}
      />
    ),
    url: `https://www.facebook.com/michaeluloth`
  },
  {
    name: `Dev.to`,
    icon: (
      <DevSVG
        style={{
          width: `1.608rem`,
          height: `1.5rem`,
          verticalAlign: `middle`,
          transform: `scale(1.25)`
        }}
      />
    ),
    url: `https://dev.to/ooloth`
  }
]

///////////////////////////////////////////////////////////////////////////////////

import React, { Fragment } from 'react'

import { ReactComponent as TwitterSVG } from '../svg/twitter-brands.svg'
import { ReactComponent as GitHubSVG } from '../svg/github-brands.svg'
import { ReactComponent as DevSVG } from '../svg/dev-brands.svg'
import { ReactComponent as LinkedInSVG } from '../svg/linkedin-in-brands.svg'
import { ReactComponent as FacebookSVG } from '../svg/facebook-f-brands.svg'

import Emoji from '../components/Emoji'
import Link from '../components/Link'

export default Contact
