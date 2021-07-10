import React, { useEffect, useState } from 'react'
import firebase from './../firebase/clientApp'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollection, useDocumentData } from 'react-firebase-hooks/firestore'
import { useRouter } from 'next/dist/client/router'
import Form from '../components/Form'
import Task from '../components/Task'
import { useRef } from 'react'
import useSound from 'use-sound'
import Top from '../components/Top'

export default function Home() {
  const db = firebase.firestore()
  const [user, userLoading,] = useAuthState(firebase.auth())
  const [tasks, tasksLoading,] = useCollection(db.collection('users').doc(user?.uid).collection('tasks'))
  let orderedTasks = useDocumentData(db.collection('users').doc(user?.uid))[0]?.orderedTasks
  const [newTask, setNewTask] = useState('')
  const [finTask, setFinTask] = useState('')
  const finRef= useRef('')
  const router = useRouter()

  // Sounds
  const [playBurgir] = useSound('/sounds/Burgir.mp3')
  const [playZep] = useSound('/sounds/Immigrant_Song.mp3')
  const [playTodo] = useSound('/sounds/MS_Todo.mp3')
  const [playRick] = useSound('/sounds/Rick_Roll.mp3')
  const [playPiao] = useSound('/sounds/Xue_Hua_Piao_Piao.mp3')

  const sounds = ['playBurgir()', 'playZep()', 'playTodo()', 'playRick()', 'playPiao()']

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
    if (orderedTasks) {
      orderedTasks.push(docId)
      db.collection('users').doc(user?.uid).update({
        orderedTasks: orderedTasks
      })
    }
    else {
      orderedTasks = [docId]
      db.collection('users').doc(user?.uid).set({
        orderedTasks: orderedTasks
      })
    }

  }

  const playRandomSound = () => {
    const randomSound = sounds[Math.floor(Math.random() * sounds.length)]
    eval(randomSound)
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
      playRandomSound()
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
    <>
      <Top />
      <div className='wrapper'>
        {user &&
          <>
            <h1>{`Get Your Shit Done, ${user?.displayName?.split(' ')[0]}!`}</h1>
            <h2>New Task</h2>
            <Form newTask={newTask} setNewTask={setNewTask} handleClick={handleSubmit} />
            <h2>Tasks</h2>
            {!tasksLoading && orderedTasks &&
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
            }
            <button id='logout' onClick={handleLogout}>Logout</button>
          </>
        }
      </div>
    </>
  )
}
