const WebsitesPage = ({ data }) => (
  <main>
    <Hero content={data.allWebsitesJson.edges[0].node.hero} />
    <Work sites={data.allWebsitesJson.edges[0].node.sites} />
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
 * Work
 * 
 */

import Image from 'gatsby-image'
import shortid from 'shortid'

const Work = ({ sites }) => (
  <section className="mb3 pb4">
    {/* <h2
      className="mb6 tc lh-solid f1 sm:f-5 fw9 ttu tracked-slight"
      // style={{ fontSize: `calc( (1vw + 1vh + .5vmin) * 5 )` }}
    >
      Work
    </h2> */}
    {sites.map(site => {
      return <Site key={shortid()} site={site} />
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
      <HyperLink href={site.link} className="link link-black-to-green dib">
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

// import Aux from 'react-aux'

const CoffeeshopBlurb = () => (
  <div>
    I've also partnered with designer Stephen Bell of Coffeeshop Creative to build sites for{' '}
    <HyperLink href="https://johngreermusic.com/" className="link-inline">
      John&nbsp;Greer
    </HyperLink>,{' '}
    <HyperLink href="http://www.riccardoiannello.com/" className="link-inline">
      Riccardo Iannello
    </HyperLink>,{' '}
    <HyperLink href="https://www.rachelkrehm.com/" className="link-inline">
      Rachel&nbsp;Krehm
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
  </div>
)

/* 
 *
 * Queries
 * 
 */

// TODO: update starter with this type of full-page query in pages/index.js
export const query = graphql`
  query WebsitePageQuery {
    placeholderImage: imageSharp(id: { regex: "/placeholder.jpg/" }) {
      sizes(maxWidth: 5000) {
        ...GatsbyImageSharpSizes_withWebp
      }
    }
    allWebsitesJson {
      edges {
        node {
          hero {
            theme
            title
            titleMultiplier
            blurb
          }
          sites {
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
  }
`
