import React from 'react'
import {connect} from 'react-redux'

const mapStateToProps = (state) => {
  return {
    todos: state.todos
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onDelete: () => {
      console.log('delete here')
    }
  }
}

const Todos = (props) => {
  const { todos } = props 
  return (
    // <div>
    //   ini todos

    //   <table className="table">
    //     <thead>
    //       <tr>
    //         <th>test</th>
    //         <th>test</th>
    //       </tr>
    //     </thead>
    //     <tbody>
    //       <tr>
    //         <td>123</td>
    //         <td>123</td>
    //       </tr>
    //     </tbody>
    //   </table>
    // </div>
    todos.map(todo => <h1>{todo.name}</h1>)
  )
} 

export default connect(mapStateToProps, mapDispatchToProps)(Todos)