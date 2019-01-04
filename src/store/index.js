import { createStore } from 'redux'

const initialState = {
  isLogin: ''
}

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case 'LoginSuccess': 
      console.log('masuk sini sih')
      return {...state, isLogin: action.data}
    default:
      return state
  }
}

const store = createStore(reducer)

export default store