import React, { Component, Fragment } from 'react'
import { Redirect, Link } from 'react-router-dom'
import api from '../../api/api'
import { connect } from "react-redux";


const mapStateToProps = (state) => {
  return {
    isLogin: state.isLogin
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLoginSuccess: async (token) => {
      if (token) {
        const {data: {email}} = await api({
          method: 'POST',
          url: '/users',
          headers: {
            Auth: token
          }
        })

        const action = {
          type: 'LogInCheck',
          data: email
        }

        dispatch(action)
      }
      
    }
  }
}

class Login extends Component {
  state = {
    email: '',
    password: '',
    errMsg: ''
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
        // console.log(data)
        localStorage.token = data.token
        onLoginSuccess(data.token)
        history.push('/')
      }).catch((err) => {
        this.setState({errMsg: err.response.data.message})
        console.log(err.response.data.message)
      });
  }

  render() {
    const { isLogin } = this.props
    const { email, password, errMsg } = this.state
    const styleLink = {
      marginTop: '2vh',
      float: 'right', 
      cursor: 'pointer', 
      color: 'blue', 
      textDecoration: 'underline'
    }
    let error = ''
    if (errMsg) {
      error = <div className="alert">
        <span className="closebtn" onClick={() => this.setState({errMsg: ''})}>&times;</span>
        {errMsg}
      </div>
    }
    return (isLogin) ? <Redirect to="/"/> :
    <Fragment>
      <div className="flexbox-container">
        <div className="flexbox-item fixed">
          <div className="demo">
            <form onSubmit={this.loginSend}>
              {error}
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
              <Link to="/register"><div style={styleLink}>Register new account</div></Link>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  }
}

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(Login)