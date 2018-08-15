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
    signInOptions: [this.firebase.auth.GoogleAuthProvider.PROVIDER_ID],
    callbacks: {
      // Avoid redirects after sign-in.
      signInSuccessWithAuthResult: () => false
    }
  }

  // Listen to the Firebase Auth state and set the local state.
  componentDidMount() {
    this.firebase = new Firebase()
    this.displayName = this.firebase.auth().currentUser.displayName

    this.unregisterAuthObserver = this.firebase
      .auth()
      .onAuthStateChanged(user => this.setState({ isSignedIn: !!user, user: user }))
  }

  signOut = () => this.firebase.auth().signOut()

  // Make sure we un-register Firebase observers when the component unmounts.
  componentWillUnmount() {
    this.unregisterAuthObserver()
  }

  render() {
    console.log(`user`, this.state.user)

    if (this.firebase) {
      if (!this.state.isSignedIn) {
        return (
          <div>
            <FirebaseAuth
              uiConfig={this.uiConfig}
              firebaseAuth={this.firebase.auth()}
            />
          </div>
        )
      }
      return (
        <div className="container pt4 tr">
          <p>Welcome, {this.displayName}!</p>
          <button onClick={this.signOut} className="red b">
            Sign-out
          </button>
        </div>
      )
    }
  }
}

/*
 *
 * Imports & Exports
 *
 */

import React, { Component } from 'react'
import FirebaseAuth from 'react-firebaseui/FirebaseAuth'
import Firebase from './firebase/firebase'
// import firebase from './firebase/firebase'

export default SignInScreen
