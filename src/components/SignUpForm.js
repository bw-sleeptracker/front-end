// dependancies
import React, { useState } from "react";
import { Switch, Route, Link } from "react-router-dom";
import * as yup from "yup";
import axios from "axios";
import styled from "styled-components";

// working on Yup
 const fromSchema = yup.object().shape({
    firstname: yup.string().required("Name is required"),
    lastname: yup.string().required("Last Name is required"),
    username: yup.string().required("User Name is required"),
    password: yup.string().required("Password is Required"),
  });

export default function SignUpForm() {

    const [forms, setForms] = useState({
      firstname: "",
      lastname: "",
      username: "",
      password: ""
    });
    
    // making error state
    const [errorState, setErrorState] = useState({
      firstname: "",
      lastname: "",
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
        .post("", forms)
        .then((response) => console.log(response))
        .catch((err) => console.log(err));
    };
  
    // 
    const myOnChange = (e) => {
      //  console.log(myOnChange)
      e.persist();
      validate(e);
      let value = e.target.name === "name" ? e.target.text : e.target.value;
      setForms({ ...forms, [e.target.name]: value });
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
      <Switch>
    <Route> 
        <>
        <FormHeader>
        <h1>SLEEP-TRACKER SIGNUP HERE!</h1>
        <div className="home-button">
          <Link to="/">
            <button>Home</button>
          </Link>{" "}
        </div>
        <br/><br/>
        
        <form className="info" onSubmit={submitHandler}>
            <label htmlFor="firstname=">
          First Name:
          <input
            type="text"
            name="firstname"
            id="firstname"
            placeholder="First Name"
            value={forms.firstname}
            onChange={myOnChange}
          />
          {errorState.firstname.length > 0 ? (
            <p className="error">{errorState.firstname}</p>
          ) : null}
            </label>
              <br/><br/>
            <label htmlFor="lastname">
          Last Name:
          <input
            type="text"
            name="lastname"
            id="lastname"
            placeholder="Last Name"
            value={forms.lastname}
            onChange={myOnChange}
          />
          {errorState.lastname.length > 0 ? (
            <p className="error">{errorState.lastname}</p>
          ) : null}
            </label>
            <br/> <br/>
            <label htmlFor="username">
          User Name:
          <input
            type="text"
            name="username"
            id="username"
            placeholder="User Name"
            value={forms.username}
            onChange={myOnChange}
          />
          {errorState.username.length > 0 ? (
            <p className="error">{errorState.username}</p>
          ) : null}
            </label>
            <br/><br/>

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

      <Link to="/">
        <button className="formbutton" type="submit">
          Submit
        </button>
      </Link>{" "}

      <Link to="/">
        <button className="formbutton" type="text">
          Reset Form?
        </button>
      </Link>{" "}
         </form>
      </FormHeader>
    </>
  </Route>
  </Switch>
    );
  }