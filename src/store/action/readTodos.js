import api from "../../api/api";


export default (token) => {
  return (dispatch) => {
    dispatch({
      type: 'ReadTodosLoading'
    })
    // console.log('kepanggil dong')
    api({
      method: 'get',
      url: 'todos',
      headers: {
        Auth: token
      }
    })
      .then(({data}) => {
        // console.log(data.todos)
        dispatch({
          type: 'ReadTodosSuccess',
          data: data.todos
        })
      }).catch((err) => {
        dispatch({
          type: 'ReadTodosErr',
          data: err.message
        })
      });
  }
}