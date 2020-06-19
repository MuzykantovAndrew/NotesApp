



import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';

import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import  authReducer from './Reducers/AuthReducer'


import { Router } from "react-router-dom"
import {createBrowserHistory} from 'history'

let state = {
  auth: {
    user: null,
    login: "",
    password: "",
    authCheck: true,
    errorMessage: "",
    tasks: []
  }
}



let rootReducer = combineReducers({auth: authReducer});

let store = createStore(rootReducer, state, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
let history = createBrowserHistory();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router history={history}>
        <App/>
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);