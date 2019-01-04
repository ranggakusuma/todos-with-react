import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import './style.css'

const mapStateToProps = (state) => {
  return {
    isLogin: state.isLogin
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLogOut: () => {
      localStorage.clear()
      const action = {
        type: 'Logout'
      }
      // console.log(dispatch)
      dispatch(action)
    }
  }
}

const Navbar = (props) =>  {
  return (
    <ul>
      <li><Link to="/">Home</Link></li>
      <li className="right"><div onClick={props.onLogOut} style={{cursor: 'pointer'}}>Logout</div></li>
    </ul>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)