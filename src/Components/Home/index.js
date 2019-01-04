import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import Navbar from '../Navbar'
import Container from '../Container'
import Todos from '../Todos'
import api from '../../api/api'

const mapStateToProps = (state) => {
  // console.log(state.isLogin, 'sasas')
  return {
    isLogin: state.isLogin
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    readTodos: (data) => {
      const action = {
        type: 'ReadTodos',
        data: data
      }
      dispatch(action)
      // console.log(data)
    }
  }
}

class Home extends Component {
  
  componentDidMount =() => {
    const { isLogin, readTodos } = this.props
    if (isLogin) {
      api({
        url: '/todos',
        method: 'GET',
        headers: {
          Auth: localStorage.token
        }
      })
        .then(({ data: { todos } }) => {
          // console.log(todos, 'data todos')
          readTodos(todos)
        }).catch((err) => {
          
        });
    }
  }

  render () {
    const { isLogin } = this.props
    return (
      (isLogin) ? <Fragment>
        <Navbar />
        <Container>
          <div style={{display: 'block'}}>
            <button className="btn green" style={{flexWrap: 'wrap'}}>Add Todo</button>
          </div>
          <div className="row my-2">
            <div className="px-2" style={{flex: `0 0 calc(33.333% - 1em)`, borderRight: '1px solid #dee2e6'}}>1</div>        
            <div className="px-2" style={{flex: '0 0 calc(60.667% - 1em)'}}>
              <Todos />
            </div>
          </div>
        </Container>
      </Fragment> : <Redirect to="/login"/>
    )
  }
  
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)