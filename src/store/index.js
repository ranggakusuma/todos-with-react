import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import login from './reducer/login'
import todos from './reducer/todos'

// console.log(login, 'sklaskalkslaksl')
const reducerCombined = combineReducers({login, todos})
const store = createStore(reducerCombined, applyMiddleware(thunk))

export default store