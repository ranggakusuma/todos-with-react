import React from 'react'

export default (props) => {
  const styleContainer = {
    backgroundColor: '#eeeef0',
    marginRight: '10vh',
    marginLeft: '10vh',
    marginTop: '2vh',
    minHeight: '80vh',
    borderRadius: '.5em',
    padding: '2vh'
  }

  return (
    <div style={styleContainer}>
        {props.children}
    </div>
  )
}