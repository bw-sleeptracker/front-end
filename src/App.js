// * dependencies:
import React, { useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import AddSleep from "./components/AddSleep"

// * utility  comp
import PrivateRoute from './components/PrivateRoute';

// * styling
// commented out because of no css folder
// import './CSS/index.css';
// import { bootstrap } from "react-router-dom";

// * components: 
import LoginPage from './components/LoginPage';
import SignUpForm from './components/SignUpForm';

// import logo from './logo.svg';
// import './App.css';

function App() {

  // first...
  const [ isNewUser, setNewUser ] = useState(false);

  // second...
  // const [ token, setToken] = useState(localStorage.getItem("token") || null);



  // * sets local state if user selects new user

  // frist option.. 
  const launchSignUp = (event) => {
    event.preventDefault()
    setNewUser(true);
  }
  console.log("is it working")

  return (


  //first option...
    <div className="App">
      <Switch>
          <Route exact path='/'>
            {/* * conditionally renders form based on local state isNewUser */}
            {isNewUser
              ? 
                <SignUpForm /> 
              :
                <div>
                  <button 
                  className='app-container__button'
                  onClick={launchSignUp}
                  > I'm a New User </button> 
                  <LoginPage />
                  <AddSleep/>
                </div>
            }
          </Route>
          {/* need to make a component for SleepTrackList}
          {/* <PrivateRoute exact path='/sleeptracker' component={SleepTrackerList} /> */}
          
      </Switch>
      {/* need to make a component for MainObject}
      {/* <MainObject /> */}
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

export default App;
