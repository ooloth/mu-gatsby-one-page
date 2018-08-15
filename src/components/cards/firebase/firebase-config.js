// export const firebaseConfig = () => (
//   <StaticQuery
//     query={graphql`
//       query {
//         site {
//           siteMetadata {
//             firebaseConfig {
//               apiKey
//               authDomain
//               databaseURL
//               projectId
//               storageBucket
//               messagingSenderId
//             }
//           }
//         }
//       }
//     `}
//     render={data => data.site.siteMetadata.firebaseConfig}
//   />
// )

export const firebaseConfig = {
  apiKey: process.env.CARDS_FIREBASE_API_KEY,
  authDomain: process.env.CARDS_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.CARDS_FIREBASE_DATABASE_URL,
  projectId: process.env.CARDS_FIREBASE_PROJECT_ID,
  storageBucket: process.env.CARDS_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.CARDS_FIREBASE_MESSAGING_SENDER_ID
}

import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
