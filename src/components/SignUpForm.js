/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
// dependancies
import React, { useState } from "react";
import { Route, Link, useHistory } from "react-router-dom";
import * as yup from "yup";
import axios from "axios";
// import styled from "styled-components";

// working on Yup
 const fromSchema = yup.object().shape({
    username: yup.string().required("User Name is required"),
    password: yup.string().required("Password is Required"),
    email: yup.string().email().required("Email is required"),
  });

export default function SignUpForm() {
    const history = useHistory()
    const [forms, setForms] = useState({
      email: "",
      username: "",
      password: ""
    });
    
    // making error state
    const [errorState, setErrorState] = useState({
        email: "",
      username: "",
      password: ""
    });
  
    // try to validate
    const validate = (e) => {
      let value = e.target.type === "name" ? e.target.name : e.target.value;
      yup
        .reach(fromSchema, e.target.name)
        .validate(value)
        .then((valid) => {
          setErrorState({
            ...errorState,
            [e.target.name]: "",
          });
        })
        .catch((err) => {
          console.log(err.errors);
          setErrorState({
            ...errorState,
            [e.target.name]: err.errors[0],
          });
        });
    };
  
    // submit
    const submitHandler = (e) => {
      e.preventDefault();
      console.log("form submitted!");
  
      axios
        .post("https://sleep-tracker-backend.herokuapp.com/auth/register", forms)
        .then((response) => console.log(response))
        .catch((err) => console.log(err));
        history.push("/login")
    };
  
    // 
    const myOnChange = (e) => {
      //  console.log(myOnChange)
      e.persist();
      validate(e);
      setForms({ ...forms, [e.target.name]: e.target.value });
    };
  
   
    const FormHeader = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 3%;
    color: #3d040b;
    `;

    return (
    <Route> 
        <>
        
        <h1>SLEEP-TRACKER SIGNUP HERE!</h1>
        <div className="home-button">
          <Link to="">
            <button>Home</button>
          </Link>{" "}
        </div>
        <br/><br/>
        
        <form className="info" >
            <label htmlFor="username">
          Username:
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Username"
            value={forms.username}
            onChange={myOnChange}
          />
          {errorState.username.length > 0 ? (
            <p className="error">{errorState.username}</p>
          ) : null}
            </label>
              <br/><br/>
            <label htmlFor="email">
          Email:
          <input
            type="text"
            name="email"
            id="email"
            placeholder="Email"
            value={forms.email}
            onChange={myOnChange}
          />
          {errorState.email.length > 0 ? (
            <p className="error">{errorState.email}</p>
          ) : null}
            </label>
            <br/> <br/>

            <label htmlFor="password">
          Password:
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            value={forms.password}
            onChange={myOnChange}
          />
          {errorState.password.length > 0 ? (
            <p className="error">{errorState.password}</p>
          ) : null}
            </label>
            <br/><br/>

     
        <button className="formbutton" type="submit"onClick={submitHandler}>
          Submit
        </button>
      
         </form>
     
    </>
  </Route>
    );
  }