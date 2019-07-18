function useOperaData() {
  const { allOperaYaml } = useStaticQuery(
    graphql`
      query {
        allOperaYaml {
          nodes {
            title {
              text
              lang
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
            features {
              emoji
              text
            }
            details {
              name
              value
              lang
            }
          }
        }
      }
    `
  )

  return allOperaYaml.nodes
}

///////////////////////////////////////////////////////////////////////////////////

import { useStaticQuery, graphql } from 'gatsby'

export default useOperaData
