import React from 'react'
import './style.css'

const Sidebar = (props) => {
  const { unfinish, all, finish } = props
  const style = {
    height: '10vh',
    width: '80%',
    backgroundColor: 'white',
    borderWidth: 0.5,
    borderColor: 'rgba(0,0,0,.125)'
    // borderRadius: 5,
  }

  return (
    <div className="sidebar">
    <button style={style} onClick={all}>All Todo</button>

    <button style={style} onClick={unfinish}>Unfinished</button>

    <button style={style} onClick={finish}>Finished</button>
  </div>
  )
}

export default Sidebar