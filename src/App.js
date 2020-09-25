/* eslint-disable no-unused-vars */
// * dependencies:
import React, { useState } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import EditSleep from "./components/EditSleep"
import BedTime from "./components/BedTime"
import './App.css';
// * utility  comp
import PrivateRoute from './components/PrivateRoute';
// import { bootstrap } from "react-router-dom";
// * styling
import { bootstrap } from "react-router-dom";

// * components: 

import LoginPage from './components/LoginPage';
import SignUpForm from './components/SignUpForm';
import MainObject from './components/MainObject';
import SleepLogPage from './components/SleepLogPage';
import styled from 'styled-components';
import Dashboard from './components/Dashboard';

// import logo from './logo.svg';
// import './App.css';

function App() {

  // first...
  const [ isNewUser, setNewUser ] = useState(false);

  // second...
  // const [ token, setToken] = useState(localStorage.getItem("token") || null);
  // * sets local state if user selects new user
  // first option.. 
  const launchSignUp = (event) => {
    event.preventDefault()
    setNewUser(true);
  }
  console.log("is it working")

  return (


  //first option...
    <div className="App">

<nav class="navbar navbar-dark bg-dark">

<Link to='/login'> Login </Link>
<Link to='/register'> Sign Up</Link>
</nav>

      <Switch>

      <Route path='/editsleep'>
        <EditSleep/>
        </Route>
          <Route path='/login'>
          <LoginPage />
            </Route>
            <Route path='/register'>
              <SignUpForm />
            </Route>
          {/* {/* need to make a component for SleepTrackList}
           <PrivateRoute exact path='/sleeptracker' component={SleepTrackerList} /> */}
          <Route path="/bedtime">
            <BedTime/>
          </Route>
      </Switch>
       <PrivateRoute path="/sleep-tracker"component={MainObject}/>
       <PrivateRoute path="/day-logs"component={SleepLogPage}/>

       <PrivateRoute path="/dashboard"component={Dashboard}/>

    </div>


  );
}

const AppContainer = styled.div`
  background: ##A8D0E6;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 3%;
  color: #3d040b;
    `;

export default App;
