const IndexPage = ({ data }) => (
  <main>
    <Hero />
    <Work operas={data.allOperaJson.edges} websites={data.allWebsitesJson.edges} />
    <Contact />
  </main>
)

export default IndexPage

/* 
 *
 * General
 * 
 */

import React from 'react'
import { Provider, Subscribe, Container } from 'unstated'

import Hero from '../sections/Hero'
import Work from '../sections/Work'
import Contact from '../sections/Contact'

import { CounterContainer } from '../sections/Work'

// TODO: update starter with this type of full-page query in pages/index.js
export const query = graphql`
  query IndexPageQuery {
    allOperaJson {
      edges {
        node {
          image {
            childImageSharp {
              sizes(maxWidth: 940) {
                ...GatsbyImageSharpSizes_withWebp
              }
            }
          }
          alt
          title
          category
          tags
          description
          reviews {
            quotation
            source
            link
          }
          details {
            name
            value
          }
          link
        }
      }
    }
    allWebsitesJson {
      edges {
        node {
          image {
            childImageSharp {
              sizes(maxWidth: 940) {
                ...GatsbyImageSharpSizes_withWebp
              }
            }
          }
          alt
          title
          category
          tags
          description
          details {
            name
            value
          }
          link
        }
      }
    }
  }
`
