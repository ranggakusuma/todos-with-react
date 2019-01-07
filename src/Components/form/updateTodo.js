import React, { Component } from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import api from '../../api/api';
import readTodos from '../../store/action/readTodos'
import { connect } from 'react-redux'

const mapDispatchToProps = (dispatch) => {
  return {
    onUpdate: (token) => {
      dispatch(readTodos(token))
    }
  }
} 

class UpdateTodo extends Component {
  state = {
    id: '',
    name: '',
    description: '',
    dueDate: new Date()
  }


  updateTodoSend = (e) => {
    e.preventDefault()
    const {id, name, description, dueDate} = this.state
    const { onUpdate, closeModal } = this.props
    const token = localStorage.token
    const data = {
      name,
      description,
      dueDate
    }

    api({
      method: 'put',
      url: 'todos/'+id,
      data: data,
      headers: {
        Auth: token
      }
    })
      .then((result) => {
        onUpdate(token)
        closeModal()
      }).catch((err) => {
        console.log(err.message)
      });

  }

  handleChange = (date) => {
    this.setState({
      dueDate: date
    });
  }

  componentDidMount = () => {
    const {todo: { id, name, description, dueDate } } = this.props
    // console.log(typeof dueDate, 'ini tipe nya apa:')
    this.setState({
      id,
      name,
      description,
      dueDate: new Date(dueDate)
    })
  }

  

  render() {
    const { name, description} = this.state
    return (
      <div style={{width: '90vh'}}>
        <form onSubmit={this.updateTodoSend}>

          <label htmlFor="name">Name</label>
          <input className="form-control" 
          id="name" 
          autoComplete="off" 
          placeholder="Name of Todo" 
          onChange={(e) => this.setState({name: e.target.value})}
          value={name}
          />

          <label htmlFor="Description">Description</label>
          <input 
          className="form-control" 
          id="description" 
          autoComplete="off" 
          placeholder="Desc of Todo" 
          onChange={(e) => this.setState({description: e.target.value})}
          value={description}/>

          <label htmlFor="date">Due Date</label>
          <div style={{textAlign: 'center'}}>
            <DatePicker
              inline
              selected={this.state.dueDate}
              onChange={this.handleChange}
            />
          </div>
          <button  className="btn green" style={{float: 'right'}}>Submit</button>
        </form>
      </div>
    )
  }
}

export default connect(null, mapDispatchToProps)(UpdateTodo)