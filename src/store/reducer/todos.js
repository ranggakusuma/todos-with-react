const initialState = {
  todos: [],
  loading: false,
  err: false,
  errMsg: ''
}

const todos = (state = initialState, action) => {
  switch(action.type) {
    case 'ReadTodosLoading': 
      return {...state, loading: true}
    case 'ReadTodosSuccess':
      return {...state, loading: false, todos: action.data}
    case 'ReadTodosErr':
      return {...state, loading: false, err: true, errMsg: action.data}
    case 'DeleteTodoLoading':
      return {...state, loading: true}
    case 'DeleteTodosErr':
      return {...state, loading: false, err: true, errMsg: action.data}
    case 'FinishTodoLoading':
      return {...state, loading: true}
    case 'FinishTodosErr':
      return {...state, loading: false, err: true, errMsg: action.data}
    default:
      return state
  }
}

export default todos