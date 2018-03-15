const Contact = () => (
  <section className="bg-near-white pt6 pb3">
    <div className="container">
      <h2
        className="mb4 lh-solid f-3p5 sm:f-5 md:f-6 fw9 ttu"
        style={{
          marginLeft: `-.03em`
        }}
      >
        Contact<span className="green">.</span>
      </h2>

      <p className="mb4 pb3 measure-narrow lh-copy f4 sm:f3 fw4" style={{ maxWidth: `32ch` }}>
        Want to work together? Tell me about your project! 👋
      </p>

      <div className="sm:flex sm:mb6">
        <HyperLink href="mailto:hello@michaeluloth.com" className="link dib mr3 mb4 sm:mb0">
          Email me
        </HyperLink>
        <nav aria-label="Social media links">
          <ul className="mb6 sm:mb0">
            {links.map(link => {
              return (
                <li key={shortid.generate()} className="dib mr3 f3">
                  <HyperLink
                    href={link.url}
                    className="icon"
                    srText={`Follow me on ${link.name}`}
                  >
                    {link.icon}
                  </HyperLink>
                </li>
              )
            })}
          </ul>
        </nav>
      </div>
      <Copyright />
    </div>
  </section>
)

const links = [
  {
    name: `Facebook`,
    icon: <FaFacebook className="" style={{ width: `1.608rem`, height: `1.5rem` }} />,
    url: 'https://www.facebook.com/michaeluloth'
  },
  {
    name: `Twitter`,
    icon: <FaTwitter className="" style={{ width: `1.608rem`, height: `1.5rem` }} />,
    url: 'https://twitter.com/ooloth'
  },
  {
    name: `LinkedIn`,
    icon: <FaLinkedin className="" style={{ width: `1.608rem`, height: `1.5rem` }} />,
    url: 'https://www.linkedin.com/in/michael-uloth-848a1b98/'
  },
  {
    name: `GitHub`,
    icon: <FaGithub className="" style={{ width: `1.608rem`, height: `1.5rem` }} />,
    url: 'https://github.com/ooloth'
  }
]

/* 
 *
 * Copyright
 * 
 */

const Copyright = () => (
  <p className="f6 sm:f5">&copy; {new Date().getFullYear()} Michael Uloth</p>
)

export default Contact

/* 
 *
 * Imports
 * 
 */

import React from 'react'
import shortid from 'shortid'

import FaTwitter from 'react-icons/lib/fa/twitter'
import FaGithub from 'react-icons/lib/fa/github'
import FaLinkedin from 'react-icons/lib/fa/linkedin'
import FaFacebook from 'react-icons/lib/fa/facebook'
import FaEnvelopeO from 'react-icons/lib/fa/envelope-o'

import HyperLink from '../components/HyperLink'
