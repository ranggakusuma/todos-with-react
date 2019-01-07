import api from "../../api/api";
import readTodos from '../action/readTodos'

export default (id, token) => {
  return (dispatch) => {
    dispatch({
      type: 'DeleteTodoLoading'
    })

    api({
      method: 'delete',
      url: 'todos/' + id,
      headers: {
        Auth: token
      }
    })
      .then((result) => {
        dispatch(readTodos(token))
      }).catch((err) => {
        dispatch({
          type: 'DeleteTodosErr',
          data: err.message
        })
      });
  }
}