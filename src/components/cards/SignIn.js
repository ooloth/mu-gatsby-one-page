// TODO: Update the appearance (refer to link below for instructions)
// TODO: See https://github.com/firebase/firebaseui-web-react

class SignInScreen extends Component {
  state = {
    isSignedIn: false // Local signed-in state.
  }

  firebaseuiConfig = {
    signInFlow: 'popup', // Popup signin flow rather than redirect flow.
    signInOptions: [this.props.firebase.auth.GoogleAuthProvider.PROVIDER_ID],
    callbacks: {
      signInSuccessWithAuthResult: () => false // Avoid redirects after sign-in
    }
  }

  componentDidMount = () => this.registerAuthObserver()

  registerAuthObserver = () => {
    const { firebase } = this.props

    this.unregisterAuthObserver = firebase
      .auth()
      .onAuthStateChanged(user => this.setState({ isSignedIn: !!user }))
  }

  signOut = () => this.props.firebase.auth().signOut()

  // Unregister Firebase observers when the component unmounts
  componentWillUnmount = () => this.unregisterAuthObserver()

  render() {
    const { firebase } = this.props

    if (firebase) {
      if (!this.state.isSignedIn) {
        return (
          <div>
            <FirebaseAuth
              uiConfig={this.firebaseuiConfig}
              firebaseAuth={firebase.auth()}
            />
          </div>
        )
      }
      return (
        <div className="container pt4 tr">
          <p>Welcome, {firebase.auth().currentUser.displayName}!</p>
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
// import '../../../node_modules/firebaseui/dist/firebaseui.css'

export default SignInScreen
