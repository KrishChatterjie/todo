import React, { useEffect, useState } from 'react'
import firebase from './../firebase/clientApp'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollection, useDocumentData } from 'react-firebase-hooks/firestore'
import { useRouter } from 'next/dist/client/router'
import Form from '../components/Form'
import Task from '../components/Task'
import { useRef } from 'react'

export default function Home() {
  const db = firebase.firestore()
  const [user, userLoading, userError] = useAuthState(firebase.auth())
  const [tasks, tasksLoading, tasksError] = useCollection(db.collection('users').doc(user?.uid).collection('tasks'))
  let orderedTasks = useDocumentData(db.collection('users').doc(user?.uid))[0]?.orderedTasks
  const [newTask, setNewTask] = useState('')
  const [finTask, setFinTask] = useState('')
  const finRef= useRef('')
  const router = useRouter()

  useEffect(() => {
    if (!userLoading && !user) router.push('/auth')
  }, [user, userLoading, router])

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

  const completeTask = async (id: string) => {
    if (finRef.current === '') return
    orderedTasks = orderedTasks.filter((taskId: string) => taskId !== id)
    try {
      await db.collection('users').doc(user?.uid).update({
        orderedTasks: orderedTasks
      })
      await db.collection('users').doc(user?.uid).collection('tasks').doc(id).update({
        completed: true,
      })
      finRef.current = ''
    } catch (e) {
      console.error(e)
    }
  }

  const handleTaskClick = (taskId: string) => {
    if (finRef.current === taskId) {
      setFinTask('')
      finRef.current = ''
      return
    }
    setFinTask(taskId)
    finRef.current = taskId
    setTimeout(() => {
      completeTask(finRef.current)
    }, 1000)
  }

  const handleSubmit = (e: React.BaseSyntheticEvent) => {
    e.preventDefault()
    if (newTask === '') return
    addTask()
    setNewTask('')
  }

  return (
    <div className='wrapper'>
      <h1>{`Get Your Shit Done, ${user?.displayName?.split(' ')[0]}!`}</h1>
      {user && orderedTasks &&
        <>
          <h2>New Task</h2>
          <Form newTask={newTask} setNewTask={setNewTask} handleClick={handleSubmit} />
          <h2>Tasks</h2>
          <div className='tasks'>
            {orderedTasks.map((taskId: string) => {
              return (
                <Task
                  key={taskId}
                  task={tasks?.docs.find((doc) => doc.id === taskId)}
                  completed={finTask === taskId}
                  completeTask={() => handleTaskClick(taskId)}/>
              )
            })}
          </div>
          <button id='logout' onClick={handleLogout}>Logout</button>
        </>
      }
    </div>
  )
}
