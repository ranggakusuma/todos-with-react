import React, { Component, Fragment } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Login from './Login'
import store from '../store'
import {Provider} from 'react-redux'

class App extends Component {

  componentDidMount() {
    console.log('testing did mount')
  }

  render() {
    
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Fragment>
            <Switch>
              <Route exact path="/" render={() => <div>Ini home</div>}/>
              <Route exact path="/login" render={(props) => <Login {...props}/>} />
              <Route render={() => <h1>Not Found</h1>} />
            </Switch>
          </Fragment>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
