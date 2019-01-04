import React, { Component, Fragment } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Login from './Login'
import Home from './Home'
import Register from './Register'
import store from '../store'
import {Provider} from 'react-redux'
import api from '../api/api'


class App extends Component {

  
  async componentDidMount() {
    console.log('testing did mount')
    const token = localStorage.token
    
    if (token) {
      const { data } = await api({
        method: 'POST',
        url: '/users',
        headers: {
          Auth: token
        }
      })

      const action = {
        type: 'LogInCheck',
        data: data.email
      }
      store.dispatch(action)
      
    }
  }

  render() {
    
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Fragment>
            <Switch>
              <Route exact path="/" render={(props) => <Home {...props}/>}/>
              <Route exact path="/login" render={(props) => <Login {...props}/>} />
              <Route exact path="/register" render={(props) => <Register {...props}/>} />
              <Route render={() => <h1>Not Found</h1>} />
            </Switch>
          </Fragment>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
