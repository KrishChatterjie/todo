import React from 'react'
import firebase from './../firebase/clientApp'

interface Props {
  task: firebase.firestore.QueryDocumentSnapshot<firebase.firestore.DocumentData> | undefined
  completed: boolean
  completeTask: React.MouseEventHandler
}

const Task: React.FC<Props> = ({ task, completed, completeTask }) => {
  return (
    <div className={`task ${completed ? 'done' : ''}`} onClick={completeTask}>
      <span>{completed ? '🥂' : '📜'}</span>
      <p>{task?.data().title}</p>
    </div>
  )
}

export default Task
