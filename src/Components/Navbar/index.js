import React from 'react'
import { Link } from 'react-router-dom'
import './style.css'
// import login 

const logOut = (props) => {
  // console.log('clicked', props.history)
  localStorage.clear()
  props.history.push('/login')
}


const Navbar = (props) =>  {

  return (
    <ul>
      <li><Link to="/">Home</Link></li>
      <li className="right"><div onClick={() => logOut(props)} style={({cursor: 'pointer'})}>Logout</div></li>
    </ul>
  )
}

export default Navbar