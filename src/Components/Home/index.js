import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import Navbar from '../Navbar'
import Container from '../Container'
import login from '../../store/action/login'
import readTodos from '../../store/action/readTodos'
import Todos from '../Todos'
import Modal from 'react-responsive-modal';
import AddTodo from '../form/addTodo'
import Sidebar from '../Sidebar/index'

const mapStateToProps = (state) => {
  return {
    login: state.login,
    todos: state.todos
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    readTodos: (token) => {
      dispatch(readTodos(token))
    },
    checkLogin: (token, push) => {
      dispatch(login(token, push))
    },
  }
}

class Home extends Component {

  state = {
    openModal: false,
    show: 'all'
  }

  componentDidMount =() => {
    this.props.checkLogin(localStorage.token, this.props.history)

    if (localStorage.token) {
      this.props.readTodos(localStorage.token)
    }
  }
  
  render () {
    const { openModal, show } = this.state

    let todosShow = [...this.props.todos.todos]
    if (show === 'unfinish') {
      todosShow = todosShow.filter(todo => !todo.status)
    }
    switch(show) {
      case 'all':
        todosShow = [...this.props.todos.todos]
        break
      case 'unfinish':
        todosShow = todosShow.filter(todo => !todo.status)
        break
      case 'finish':
        todosShow = todosShow.filter(todo => todo.status)
        break
      default: 
        todosShow = [...this.props.todos.todos]
        break
    }

    return (
      <Fragment>
        <Navbar {...this.props}/>
        <Container>
          <div style={{display: 'block'}}>
            <button className="btn green" style={{flexWrap: 'wrap'}} onClick={() => this.setState({openModal: true})}>Add Todo</button>
            <Modal open={openModal} onClose={() => this.setState({openModal: false})} center> 
              <AddTodo  closeModal={() => this.setState({openModal: false})}/>
            </Modal>
          </div>
          <div className="row my-2">
            <div className="px-2" style={{flex: `0 0 calc(25% - 1em)`, borderRight: '1px solid #dee2e6'}}>
              <Sidebar 
              all={() => this.setState({show: 'all'})}
              unfinish={() => this.setState({show: 'unfinish'})}
              finish={() => this.setState({show: 'finish'})}/>
            </div>        
            <div className="px-2" style={{flex: '0 0 calc(70% - 1em)'}}>
              <Todos todos={todosShow}/>
            </div>
          </div>
        </Container>
      </Fragment>
    )
  }
  
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)