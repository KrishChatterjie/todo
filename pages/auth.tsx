/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect } from 'react'
import FirebaseAuth from '../firebase/firebaseAuth'
import firebase from './../firebase/clientApp'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useRouter } from 'next/dist/client/router'


const auth: React.FC = () => {
  const uiConfig = {
    signInFlow: 'popup',
    signInSuccessUrl: '/',
    signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID]
  }
  const router = useRouter()
  const [user, userLoading,] = useAuthState(firebase.auth())
  useEffect(() => {
    if (!userLoading && user) router.push('/')
  }, [user, userLoading, router])

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
