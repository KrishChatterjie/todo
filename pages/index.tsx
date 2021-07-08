import firebase from './../firebase/clientApp'
import { useAuthState } from 'react-firebase-hooks/auth'

export default function Home() {
  const [user, loading, error] = useAuthState(firebase.auth())

  console.log('loading: ', loading)
  console.log('Current user: ', user)
  console.log('Error: ', error)

  const handleLogout = async () => {
    try {
      await firebase.auth().signOut();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className=''>
      <h1>Hello!</h1>
      { user &&
        <button onClick={handleLogout}>Logout</button>
      }
    </div>
  )
}
