const IndexPage = ({ data }) => {
  // Merge opera and website projects (alternate website, opera, website, etc.)
  const array1 = data.allOperaYaml.edges
  const array2 = data.allWebsitesYaml.edges
  let combinedArray = []

  // Merge arrays in an alternating pattern
  for (let i = 0; i < 10000; i++) {
    if (array1[i] && array2[i]) combinedArray.push(array1[i], array2[i])
    else if (array1[i]) combinedArray.push(array1[i])
    else if (array2[i]) combinedArray.push(array2[i])
    else break
  }

  // Add a unique key to each project (to prevent unnecessary rerendering)
  const projectsWithKeys = [...combinedArray].map(project => {
    project.key = shortid.generate()
    return project
  })

  return (
    <Fragment>
      <main>
        <Hero />
        <Work projects={projectsWithKeys} />
        <Contact />
      </main>
      <Footer />
    </Fragment>
  )
}

/* 
 *
 * Queries
 * 
 */

export const query = graphql`
  query IndexPageQuery {
    allOperaYaml {
      edges {
        node {
          title {
            text
            lang
          }
          category
          tags
          image {
            childImageSharp {
              sizes(maxWidth: 940) {
                ...GatsbyImageSharpSizes_withWebp
              }
            }
          }
          alt
          link
          reviews {
            quotation
            source
            link
          }
          features
          details {
            name
            value
            lang
          }
        }
      }
    }
    allWebsitesYaml {
      edges {
        node {
          title {
            text
          }
          category
          tags
          image {
            childImageSharp {
              sizes(maxWidth: 940) {
                ...GatsbyImageSharpSizes_withWebp
              }
            }
          }
          alt
          link
          reviews {
            quotation
            source
            link
          }
          description
          details {
            name
            value
          }
        }
      }
    }
  }
`

/* 
 *
 * Imports & Exports
 * 
 */

import React, { Fragment } from 'react'
import shortid from 'shortid'

import Hero from '../sections/Hero'
import Work from '../sections/Work'
import Contact from '../sections/Contact'
import Footer from '../sections/Footer'

export default IndexPage
