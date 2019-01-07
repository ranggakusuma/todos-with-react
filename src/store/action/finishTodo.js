import api from "../../api/api";
import readTodos from '../action/readTodos'

export default (id, token) => {
  return (dispatch) => {
    dispatch({
      type: 'FinishTodoLoading'
    })
    // console.log(token)
    api({
      method: 'PATCH',
      url: 'todos/finish/' + id,
      headers: {
        Auth: token
      }
    })
      .then((result) => {
        dispatch(readTodos(token))
      }).catch((err) => {
        console.log(err.message)
        dispatch({
          type: 'FinishTodosErr',
          data: err.message
        })
      });
  }
}