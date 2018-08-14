// Initialize app with the correct config
firebase.initializeApp(firebaseConfig)

// Update Firestore settings
firebase.firestore().settings({ timestampsInSnapshots: true })

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

export default firebase

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
