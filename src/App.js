// * dependencies:
import React, { useState } from 'react';
import { Switch, Route, Link } from 'react-router-dom';

// * utility  comp
import PrivateRoute from './components/PrivateRoute';

// * styling
// commented out because of no css folder
// import './CSS/index.css';
import { bootstrap } from "react-router-dom";

// * components: 
import LoginPage from './components/LoginPage';
import SignUpForm from './components/SignUpForm';
import MainObject from './components/MainObject';
import SleepLogPage from './components/SleepLogPage';
import styled from 'styled-components';

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
      <Link to='/login'>
      Login
      </Link>
      <Link to='/register'>
      Sign Up
      </Link>
      <Switch>
          <Route path='/login'>
          <LoginPage />
            </Route>
            <Route path='/register'>
              <SignUpForm />
            </Route>
          {/* {/* need to make a component for SleepTrackList}
           <PrivateRoute exact path='/sleeptracker' component={SleepTrackerList} /> */}
          
      </Switch>
       <PrivateRoute path="/sleep-tracker"component={MainObject}/>
       
       <PrivateRoute path="/day-logs"component={SleepLogPage}/>
    
    </div>

// second easier option..
    // <div className="App">
    // <Route exact path="/">
    //   <Login token={token} setToken={setToken} />
    // </Route>  
        
    //     {/* 
    //       Build a PrivateRoute component that will 
    //       display SleepTrackerPage when you're authenticated 
    //     */}
    //     <PrivateRoute path="/sleeptracker-page" component={SleepTrackerPage} />
    //   </div>

  );
}

const AppContainer = styled.div`
  background: ##A8D0E6;
`
export default App;
