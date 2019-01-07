import React, {Component, Fragment} from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import deleteTodo from '../../../store/action/deleteTodo'
import finishTodo from '../../../store/action/finishTodo'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Modal from 'react-responsive-modal';
import UpdateTodo from '../../form/updateTodo'



const mapDispatchToProps = (dispatch) => {
  return {
    onDeleteTodo: (id) => {
      // console.log('ini id', id)
      dispatch(deleteTodo(id, localStorage.token))
    },
    onFinishTodo: (id) => {
      dispatch(finishTodo(id, localStorage.token))
    }
  }
} 

class Todo extends Component {

  state = {
    openModal: false
  }

  render () {  
    const { 
      todo: { _id, name, description, dueDate, status }, 
      onDeleteTodo, 
      onFinishTodo} = this.props

    const { openModal } = this.state

    return (
      <Fragment>
        
            <tr>
              <td>{name}</td>
              <td>{description}</td>
              <td>{moment(dueDate).format('LL')}</td>
              <td> 
                {(status) ? 
                <FontAwesomeIcon icon="check" size="2x" style={{color: 'green'}}/> :
                <button className="btn green" onClick={() => onFinishTodo(_id)}>Finish</button>}
                <button className="btn yellow mx-2" onClick={() => this.setState({openModal: true})}>Update</button> 
                <button className="btn red" onClick={() => onDeleteTodo(_id)}>Delete</button>
                <Modal open={openModal} onClose={() => this.setState({openModal: false})} center>
                  <UpdateTodo todo={{
                    id: _id,
                    name: name,
                    description: description,
                    dueDate: dueDate
                  }} closeModal={() => this.setState({openModal: false})}/>
                </Modal>
              </td>
            </tr>
      </Fragment>
    )
  }
}

export default connect(null, mapDispatchToProps)(Todo)
