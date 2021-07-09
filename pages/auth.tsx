import React from 'react'
import FirebaseAuth from '../firebase/firebaseAuth'
import firebase from './../firebase/clientApp'

const auth: React.FC = () => {

  const uiConfig = {
    signInFlow: 'popup',
    signInSuccessUrl: '/',
    signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID]
  }

  return (
    <div className='wrapper auth'>
      <div className='welcome'>
        <h1>Login</h1>
        <p>Welcome to yet another todo app.</p>
        <p>Kinda need ya to sign in :)</p>
      </div>
      <FirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
    </div>
  )
}

export default auth
