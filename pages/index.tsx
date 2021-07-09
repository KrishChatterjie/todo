import React, { useEffect, useState } from 'react'
import firebase from './../firebase/clientApp'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollection, useDocumentData } from 'react-firebase-hooks/firestore'
import { useRouter } from 'next/dist/client/router'

export default function Home() {
  const db = firebase.firestore()
  const [user, userLoading, userError] = useAuthState(firebase.auth())
  // TODO: redirect to /auth if !user
  const [tasks, tasksLoading, tasksError] = useCollection(db.collection('users').doc(user?.uid).collection('tasks'))
  const orderedTasks = useDocumentData(db.collection('users').doc(user?.uid))[0]?.orderedTasks
  const [newTask, setNewTask] = useState('')
  const router = useRouter()

  useEffect(() => {
    if (!userLoading && !user) router.push('/auth')
  }, [user, userLoading, router])


  // if (!tasksLoading && tasks) {
  //   tasks.docs.map((doc) => console.log(doc.data()))
  // }

  const handleLogout = async () => {
    try {
      await firebase.auth().signOut();
    } catch (error) {
      console.log(error);
    }
  }

  const addTask = async () => {
    const docRef = await db.collection('users').doc(user?.uid).collection('tasks').add({
      completed: false,
      title: newTask,
      next: "null",
      previous: "null"
    })
    const docId = docRef.id
    orderedTasks.push(docId)
    db.collection('users').doc(user?.uid).update({
      orderedTasks: orderedTasks
    })
  }

  const handleClick = (e: React.BaseSyntheticEvent) => {
    e.preventDefault()
    addTask()
    setNewTask('')
  }

  return (
    <div className=''>
      <h1>Hello!</h1>
      { user &&
        <>
          <button onClick={handleLogout}>Logout</button>
          <h2>Tasks</h2>
          <input
            type='text'
            id='new-task'
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)} />
          <button onClick={handleClick}>Submit</button>
          {tasks?.docs?.
            filter((doc) => !doc.data().completed).
            map((doc) => <p key={doc.id}>{doc.data().title}</p>)
          }
        </>
      }
    </div>
  )
}
