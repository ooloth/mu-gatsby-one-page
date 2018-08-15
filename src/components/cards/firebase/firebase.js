class Firebase extends React.Component {
  static instance

  constructor() {
    super()
    if (this.instance) {
      return this.instance
    }

    // FIXME: Remove this!
    console.log(firebaseConfig)

    firebase.initializeApp(firebaseConfig)
    firebase.firestore().settings({ timestampsInSnapshots: true })

    this.auth = firebase.auth()
    this.db = firebase.firestore()
    this.instance = this
  }

  render() {
    return (
      <StaticQuery
        query={graphql`
          query {
            site {
              siteMetadata {
                firebaseConfig {
                  apiKey
                  authDomain
                  databaseURL
                  projectId
                  storageBucket
                  messagingSenderId
                }
              }
            }
          }
        `}
        render={null}
      />
    )
  }
}

// class Firebase {
//   static instance

//   constructor() {
//     if (this.instance) {
//       return this.instance
//     }

//     // FIXME: Remove this!
//     console.log(firebaseConfig)

//     firebase.initializeApp(firebaseConfig)
//     firebase.firestore().settings({ timestampsInSnapshots: true })

//     this.auth = firebase.auth()
//     this.db = firebase.firestore()
//     this.instance = this
//   }
// }

// Initialize app with the correct config (only once the browser is present)
// if (typeof window !== 'undefined') {
// firebase.initializeApp(firebaseConfig)
// Update Firestore settings
// firebase.firestore().settings({ timestampsInSnapshots: true })
// }

/*
  *
  * Imports & Exports
  *
  */

import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
// import 'firebase/messaging'
// import 'firebase/functions'

import { firebaseConfig } from './firebase-config'

export default Firebase
// export default firebase

// class Firebase {
//   constructor() {
//     firebase.initializeApp(firebaseConfig)
//     this.store = firestore
//     this.auth = auth
//   }

//   get cards() {
//     return this.store().collection('cards')
//   }
// }

// export default new Firebase()
