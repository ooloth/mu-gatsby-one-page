class Firebase {
  static instance

  constructor() {
    if (this.instance) {
      return this.instance
    }

    console.table(firebaseConfig)

    firebase.initializeApp(firebaseConfig)
    firebase.firestore().settings({ timestampsInSnapshots: true })

    this.auth = firebase.auth()
    this.db = firebase.firestore()
    this.instance = this
  }
}

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
