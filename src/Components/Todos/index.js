import React from 'react'
import Todo from './Todo'

const Todos = (props) => {
  const { todos } = props 
  return (
  <table className="table">
    <thead>
      <tr>
        <th>Name</th>
        <th>Description</th>
        <th>Due Date</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
    {todos.map(todo => <Todo todo={todo} key={todo._id}/>)}
    </tbody>
  </table>
  )
} 

export default Todos