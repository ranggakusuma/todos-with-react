import React, { Component } from 'react'
import { Redirect, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import api from '../../api/api'

const mapStateToProps = (state) => {
  return {
    isLogin: state.isLogin
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onRegisterSend: () => {
      const action = {
        type: 'Register',
        data: ''
      }
      dispatch(action)
    }
  }
}

class Register extends Component {
  state = {
    name: '',
    email: '',
    password: '',
    confirm: '',
    errMsg: ''
  }

  registerSend = (e) => {
    // console.log('test register')
    e.preventDefault();
    const { email, password, name, confirm } = this.state
    if (password !== confirm) {
      this.setState({errMsg: 'Password and confirm password must be same'})
    } else {
      const data = {
        name: name,
        email: email,
        password: password
      }
      console.log(data)
      api({
        url: '/register',
        method: 'post',
        data: data
      })
        .then(({data}) => {
          this.props.history.push('/login')
        }).catch((err) => {
          this.setState({errMsg: err.response.data.message})
        });
    }
  }

  render() {
    const { isLogin } = this.props
    const { email, password, name, confirm, errMsg } = this.state
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

    return (
      (isLogin) ? <Redirect to="/" /> :
      <div className="flexbox-container">
        <div className="flexbox-item fixed">
          <div className="demo">
            <form onSubmit={this.registerSend}>
              {error}
              <h2 style={{marginBottom: 20}}>Register Form</h2>

              <label htmlFor="name" >Name:</label>
              <input id="name" type="text" 
              className="form-control"
              placeholder="Your name" 
              autoComplete="off"
              onChange={(e) => this.setState({name: e.target.value})}
              value={name}/>

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

              <label htmlFor="confirm">Confirm Password:</label>
              <input id="confirm" type="password"
              className="form-control"
              placeholder="Password"
              onChange={(e) => this.setState({confirm: e.target.value})}
              value={confirm}
              />

              <button className="btn green my-2" >Submit</button>
              <Link to="/login"><div style={styleLink}>Already have account</div></Link>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register)