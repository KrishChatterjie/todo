import React, { MouseEventHandler, useState } from 'react'

interface Props {
  newTask: string
  setNewTask: React.Dispatch<React.SetStateAction<string>>
  handleClick: MouseEventHandler
}

const Form: React.FC<Props> = ({ newTask, setNewTask, handleClick }) => {

  return (
    <form>
      <input
        type='text'
        id='new-task'
        required
        autoComplete={'off'}
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)} />
      <button onClick={handleClick}>Submit</button>
    </form>
  )
}

export default Form
