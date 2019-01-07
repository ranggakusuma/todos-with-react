const initialState = {
  isLogin: '',
  loading: false,
  err: false,
  errMsg: ''
}

const login = (state = initialState, action) => {
  switch(action.type) {
    case 'LogInCheck':
      return {...state, isLogin: action.data, loading: false}
    case 'LoginLoading':
      return {...state, loading: true}
    case 'LoginErr':
      return {...state, errMsg: action.data, loading: false, err:true}
    default: 
      return state
  }
}

export default login