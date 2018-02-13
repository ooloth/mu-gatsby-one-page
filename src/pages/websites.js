const WebsitesPage = ({ data }) => (
  <main className="avenir">
    <Hero content={heroContent} />
    <Work sites={data.sites.edges} />
    <Contact />
  </main>
)

export default WebsitesPage

/* 
 *
 * General
 * 
 */

import React from 'react'

import Hero from '../components/Hero'
import Contact from '../components/Contact'
import HyperLink from '../components/HyperLink'

/* 
 *
 * Hero Content
 * 
 */

const heroContent = {
  theme: `black`,
  title: `Websites`,
  titleMultiplier: `5.75`,
  blurb: `I love building websites! Maybe too much...\nCheck out my recent work below.`
}

/* 
 *
 * Work
 * 
 */

import Image from 'gatsby-image'
import shortid from 'shortid'

const Work = ({ sites }) => (
  <section className="mt4 mb3 pt6 pv4">
    {/* <h2
      className="mb6 tc lh-solid f1 sm:f-5 fw9 ttu tracked-slight"
      // style={{ fontSize: `calc( (1vw + 1vh + .5vmin) * 5 )` }}
    >
      Work
    </h2> */}
    {sites.map(site => {
      return <Site key={shortid()} site={site.node} />
    })}
  </section>
)

const Site = ({ site }) => {
  // Intercept Coffeeshop JSON blurb and replace it with the version below with links
  if (site.title === 'Coffeeshop Creative') {
    site.blurb = <CoffeeshopBlurb />
  }
  return (
    <article className="mb4 ph3 pb5 tc">
      {/* TODO: check out aspect-ratio component and my gatsby-image component from AT's site */}
      <Image sizes={site.image.childImageSharp.sizes} alt={site.alt} className="shadow-lg" />
      <h3 className="dib mb3 pt5 f2 sm:f1 fw9 ttu tracked-slight">{site.title}</h3>
      <h4 className="sm:f4 ttu tracked-slight green">{site.category}</h4>
      <p className="ml-auto mr-auto pv4 lh-tall" style={{ maxWidth: `60ch` }}>
        {site.blurb}
      </p>
      <HyperLink href={site.link} className="link dib">
        View site
      </HyperLink>
    </article>
  )
}

/* 
 *
 * Coffeeshop Blurb (with links)
 * 
 */

import Aux from 'react-aux'

const CoffeeshopBlurb = () => (
  <Aux>
    I've also partnered with designer Stephen Bell of Coffeeshop Creative to build sites for{' '}
    <HyperLink href="https://johngreermusic.com/" className="link-inline">
      John&nbsp;Greer
    </HyperLink>,{' '}
    <HyperLink href="http://www.riccardoiannello.com/" className="link-inline">
      Riccardo Iannello
    </HyperLink>,{' '}
    <HyperLink href="http://www.alonnashman.com/" className="link-inline">
      Alon&nbsp;Nashman
    </HyperLink>,{' '}
    <HyperLink href="http://www.theaturtle.com/index.html" className="link-inline">
      Theaturtle
    </HyperLink>,{' '}
    <HyperLink href="http://www.hitandrun.ca/" className="link-inline">
      Hit&nbsp;&&nbsp;Run Dance Productions
    </HyperLink>,{' '}
    <HyperLink href="http://extensionmethod.com/" className="link-inline">
      Extension Method
    </HyperLink>,{' '}
    <HyperLink href="http://dgvolo.com/index.html" className="link-inline">
      DG&nbsp;Volo&nbsp;&&nbsp;Company
    </HyperLink>,{' '}
    <HyperLink href="http://wsbmassage.com/" className="link-inline">
      WSB&nbsp;Massage
    </HyperLink>,{' '}
    <HyperLink href="http://stephanietritchew.com/" className="link-inline">
      Stephanie&nbsp;Tritchew
    </HyperLink>{' '}
    and{' '}
    <HyperLink href="http://kristinaagur.com/" className="link-inline">
      Kristina&nbsp;Agur
    </HyperLink>.
  </Aux>
)

/* 
 *
 * Queries
 * 
 */

export const query = graphql`
  query WebsitePageQuery {
    placeholderImage: imageSharp(id: { regex: "/placeholder.jpg/" }) {
      sizes(maxWidth: 5000) {
        ...GatsbyImageSharpSizes_withWebp
      }
    }
    sites: allWebsitesJson {
      edges {
        node {
          image {
            childImageSharp {
              sizes(maxWidth: 5184) {
                ...GatsbyImageSharpSizes_withWebp
              }
            }
          }
          alt
          title
          category
          blurb
          link
        }
      }
    }
  }
`
