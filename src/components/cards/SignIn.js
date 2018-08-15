// TODO: Update the appearance (refer to link below for instructions)
// TODO: See https://github.com/firebase/firebaseui-web-react

class SignInScreen extends Component {
  // The component's Local state.
  state = {
    isSignedIn: false, // Local signed-in state.
    user: null
  }

  // Configure FirebaseUI.
  uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: 'popup',
    // We will display Google as auth provider.
    signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
    callbacks: {
      // Avoid redirects after sign-in.
      signInSuccessWithAuthResult: () => false
    }
  }

  // Listen to the Firebase Auth state and set the local state.
  componentDidMount() {
    this.unregisterAuthObserver = firebase
      .auth()
      .onAuthStateChanged(user => this.setState({ isSignedIn: !!user, user: user }))
  }

  // Make sure we un-register Firebase observers when the component unmounts.
  componentWillUnmount() {
    this.unregisterAuthObserver()
  }

  render() {
    console.log(`user`, this.state.user)

    if (!this.state.isSignedIn) {
      return (
        <div>
          <FirebaseAuth uiConfig={this.uiConfig} firebaseAuth={firebase.auth()} />
        </div>
      )
    }
    return (
      <div className="container pt4 tr">
        <p>Welcome {firebase.auth().currentUser.displayName}!</p>
        <button onClick={() => firebase.auth().signOut()} className="red b">
          Sign-out
        </button>
      </div>
    )
  }
}

/*
 *
 * Imports & Exports
 *
 */

import React, { Component } from 'react'
import FirebaseAuth from 'react-firebaseui/FirebaseAuth'
import firebase from './firebase/firebase'

export default SignInScreen
