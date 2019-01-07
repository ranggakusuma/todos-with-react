import api from '../../api/api'

export default (token, push) => {
  return (dispatch) => {
    dispatch({
      type: 'LoginLoading'
    })
    api({
      url: 'users',
      method: 'POST',
      headers: {
        Auth: token
      }
    })
      .then(({ data: {email} }) => {
        dispatch({
          type: 'LogInCheck',
          data: email
        })
      }).catch((err) => {
        dispatch({
          type: 'LoginErr',
          data: err.message
        })
        push.push('/login')
      });
    
  }
}