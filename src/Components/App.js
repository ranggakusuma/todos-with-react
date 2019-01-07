import React, { Component, Fragment } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Login from './Login'
import Home from './Home'
import Register from './Register'
import store from '../store'
import {Provider} from 'react-redux'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faCheckSquare, faCheck  } from '@fortawesome/free-solid-svg-icons'

library.add(fab, faCheckSquare, faCheck)

class App extends Component {

  render() {
    // console.log(store.getState())
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
