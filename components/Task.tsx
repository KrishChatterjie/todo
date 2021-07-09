import React from 'react'
import firebase from './../firebase/clientApp'

interface Props {
  task: firebase.firestore.QueryDocumentSnapshot<firebase.firestore.DocumentData> | undefined
}

const Task: React.FC<Props> = ({ task }) => {
  return (
    <div className='task'>
      {task?.data().title}
    </div>
  )
}

export default Task
