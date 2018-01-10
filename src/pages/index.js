import React from 'react'
import Link from 'gatsby-link'
import Img from 'gatsby-image'

const IndexPage = ({ data }) => (
  <div>
    <h1>Hi people</h1>
    <p>Welcome to your new Gatsby site.</p>
    <p>Now go build something great.</p>
    <Link to="/page-2/">Go to page 2</Link>
    <h2>Gatsby-Image Test (Blur Up)</h2>
    <Img sizes={data.placeholderImage.sizes} title={`Photo by Ken Treloar on Unsplash`} />
  </div>
)

export default IndexPage

export const query = graphql`
  query BlurUpQuery {
    placeholderImage: imageSharp(id: { regex: "/placeholder/" }) {
      sizes(maxWidth: 5211) {
        ...GatsbyImageSharpSizes
      }
    }
  }
`
