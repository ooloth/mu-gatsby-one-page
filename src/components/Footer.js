const Footer = ({ theme, className }) => {
  const bgColor = theme === `green` ? `bg-green` : null
  return (
    <footer
      className={`flex justify-between items-baseline ph3 md:ph4 pb2 sm:pb3 tc ${bgColor} ${className}`}
    >
      <Copyright />
      <SocialLinks />
    </footer>
  )
}

export default Footer

/* 
 *
 * Imports
 * 
 */

import React from 'react'

/* 
 *
 * Copyright
 * 
 */

const Copyright = () => <p className="f6">&copy; {new Date().getFullYear()} Michael Uloth</p>

/* 
 *
 * Social Links
 * 
 */

import FaTwitter from 'react-icons/lib/fa/twitter'
import FaGithub from 'react-icons/lib/fa/github'
import FaLinkedin from 'react-icons/lib/fa/linkedin'
import FaFacebook from 'react-icons/lib/fa/facebook'
import FaEnvelopeO from 'react-icons/lib/fa/envelope-o'

import HyperLink from './HyperLink'

const SocialLinks = () => (
  <ul>
    {links.map(link => {
      return (
        <li key={link.id} className="dib f4 sm:f3 ml2 sm:ml3">
          <HyperLink href={link.url} className="link-icon">
            {link.icon}
          </HyperLink>
        </li>
      )
    })}
  </ul>
)

const links = [
  {
    id: 'twitter',
    icon: <FaTwitter className="" />,
    url: 'https://twitter.com/ooloth'
  },
  {
    id: 'github',
    icon: <FaGithub className="" />,
    url: 'https://github.com/ooloth'
  },
  {
    id: 'linkedin',
    icon: <FaLinkedin className="" />,
    url: 'https://www.linkedin.com/in/michael-uloth-848a1b98/'
  },
  {
    id: 'facebook',
    icon: <FaFacebook className="" />,
    url: 'https://www.facebook.com/michaeluloth'
  },
  {
    id: 'email',
    icon: <FaEnvelopeO className="" />,
    url: 'mailto:hello@michaeluloth.com'
  }
]
