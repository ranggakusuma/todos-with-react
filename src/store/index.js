import { createStore } from 'redux'

const initialState = {
  isLogin: '',
  todos: []
}

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case 'LogInCheck':
      // console.log('checking login', action.data)
      return {...state, isLogin: action.data}
    case 'Logout':
      return {...state, isLogin: ''}
    case 'ReadTodos': 
      return {...state, todos: action.data}
    default:
      return state
  }
}

const store = createStore(reducer)

export default store