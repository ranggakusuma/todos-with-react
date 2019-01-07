import React, {Component} from 'react'
import { connect } from 'react-redux'
import readTodos from '../../store/action/readTodos'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import api from '../../api/api';

const mapDispatchToProps = (dispatch) => {
  return {
    onAddSuccess: (token) => {
      dispatch(readTodos(token))
    }
  }
}

class AddTodo extends Component {
  state = {
    name: '',
    description: '',
    dueDate: new Date()
  }
  

  handleChange = (date) => {
    this.setState({
      dueDate: date
    });
  }

  addTodoSend = (e) => {
    e.preventDefault() 
    const {name, description, dueDate} = this.state
    const { closeModal, onAddSuccess } = this.props
    const data = {
      name: name,
      description: description,
      dueDate: dueDate
    }
    api({
      method: 'POST',
      url: 'todos',
      headers: {
        Auth: localStorage.token
      },
      data: data
    })
      .then((result) => {
        closeModal()
        onAddSuccess(localStorage.token)
      }).catch((err) => {
        console.log(err.message)
      });
  }

  render = () => {
    return (
      <div style={{width: '90vh'}}>
        <form onSubmit={this.addTodoSend}>

          <label htmlFor="name">Name</label>
          <input className="form-control" 
          id="name" 
          autoComplete="off" 
          placeholder="Name of Todo" 
          onChange={(e) => this.setState({name: e.target.value})}/>

          <label htmlFor="Description">Description</label>
          <input 
          className="form-control" 
          id="description" 
          autoComplete="off" 
          placeholder="Desc of Todo" 
          onChange={(e) => this.setState({description: e.target.value})}/>
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

export default connect(null, mapDispatchToProps)(AddTodo)