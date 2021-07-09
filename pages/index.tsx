import React, { useEffect, useState } from 'react'
import firebase from './../firebase/clientApp'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollection, useDocumentData } from 'react-firebase-hooks/firestore'
import { useRouter } from 'next/dist/client/router'
import Form from '../components/Form'
import Task from '../components/Task'

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
    })
    const docId = docRef.id
    orderedTasks.push(docId)
    db.collection('users').doc(user?.uid).update({
      orderedTasks: orderedTasks
    })
  }

  const handleClick = (e: React.BaseSyntheticEvent) => {
    e.preventDefault()
    if (newTask === '') return
    addTask()
    setNewTask('')
  }

  return (
    <div className='wrapper'>
      <h1 className='shite'>Get Yo Shit Done!</h1>
      {user && orderedTasks &&
        <>
          <h2>New Task</h2>
          <Form newTask={newTask} setNewTask={setNewTask} handleClick={handleClick} />
          <h2>Tasks</h2>
          <div className='tasks'>
            {orderedTasks.map((taskId: string) => {
              return (
                <Task key={taskId} task={
                  tasks?.docs.find((doc) => doc.id === taskId)
                } />
              )
            })}
          </div>
          <button id='logout' onClick={handleLogout}>Logout</button>
        </>
      }
    </div>
  )
}
