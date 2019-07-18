function useWebsitesData() {
  const { allWebsitesYaml } = useStaticQuery(
    graphql`
      query {
        allWebsitesYaml {
          nodes {
            title {
              text
            }
            category
            tags
            image {
              childImageSharp {
                fluid(maxWidth: 940) {
                  ...GatsbyImageSharpFluid_withWebp
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
    `
  )

  return allWebsitesYaml.nodes
}

///////////////////////////////////////////////////////////////////////////////////

import { useStaticQuery, graphql } from 'gatsby'

export default useWebsitesData
