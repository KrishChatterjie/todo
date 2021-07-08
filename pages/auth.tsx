import React from 'react'
import { StyledFirebaseAuth } from 'react-firebaseui'
import FirebaseAuth from '../firebase/firebaseAuth'
import firebase from './../firebase/clientApp'

const auth: React.FC = () => {

  const uiConfig = {
    signInFlow: 'popup',
    signInSuccessUrl: '/',
    signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID]
  }

  return (
    <div>
      <h1>Login Ting</h1>
      <p>Pls sign in thanks</p>
      <FirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
    </div>
  )
}

export default auth
