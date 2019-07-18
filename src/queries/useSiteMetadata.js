function useSiteMetadata() {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            jobTitle
            description
            siteUrl
            lang
            locale
            email
            telephone
            address {
              street
              locality
              region
              postalCode
              country
            }
            socialLinks
            structuredDataType
            twitterSite
            twitterCreator
            facebookAppId
            googleSiteVerification
          }
        }
      }
    `
  )

  return site.siteMetadata
}

///////////////////////////////////////////////////////////////////////////////////

import { useStaticQuery, graphql } from 'gatsby'

export default useSiteMetadata
