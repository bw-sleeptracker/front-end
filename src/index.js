// * dependencies:
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { createStore,  applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import './src/index.css';
import  sleepReducer  from "./reducers/sleepReducer";

import './index.css';
// import * as serviceWorker from './serviceWorker';

// * components:
import App from './App';

const store = createStore(sleepReducer,  applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
  <Router>
    <App />
  </Router>
  </Provider>  
  ,
  // provider
  document.getElementById('root')
);

   
