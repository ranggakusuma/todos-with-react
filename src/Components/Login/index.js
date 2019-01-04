import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import api from '../../api/api'
import { connect } from "react-redux";


const mapStateToProps = (state) => {
  return {
    isLogin: state.isLogin
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLoginSuccess: () => {
      const action = {
        type: 'LoginSuccess',
        data: 'test'
      }

      dispatch(action)
    }
  }
}

class Login extends Component {
  state = {
    email: '',
    password: ''
  }

  loginSend = (e) => {
    e.preventDefault();
    const { email, password } = this.state
    const { onLoginSuccess, history } = this.props
    api({
      method: 'post',
      url: 'login',
      data: {
        email: email,
        password: password
      },
    })
      .then(({data}) => {
        console.log(data)
        localStorage.token = data.token
        onLoginSuccess()
        history.push('/')
      }).catch((err) => {
        console.log(err.response.data.message)
      });
    
    
  }

  render() {
    const { isLogin } = this.props
    const { email, password } = this.state

    return (isLogin) ? <Redirect to="/"/> :
    <div className="flexbox-container">
      <div className="flexbox-item fixed">
        <div className="demo">
          <form onSubmit={this.loginSend}>
            <h2 style={{marginBottom: 20}}>Login Form</h2>
            
            <label htmlFor="email" >Email:</label>
            <input id="email" type="text" 
            className="form-control"
            placeholder="Email address" 
            autoComplete="off"
            onChange={(e) => this.setState({email: e.target.value})}
            value={email}/>
            
            <label htmlFor="password">Password:</label>
            <input id="password" type="password"
            className="form-control"
            placeholder="Password"
            onChange={(e) => this.setState({password: e.target.value})}
            value={password}/>

            <button className="btn green my-2" >Submit</button>
          </form>
        </div>
      </div>
    </div>
  }
}

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(Login)