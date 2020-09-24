// * dependencies 
import React, { useState, useEffect } from "react";
import { Route, Link , useHistory} from "react-router-dom";
import * as yup from "yup";
import axios from "axios";
import styled from "styled-components";
import {axiosWithAuth} from '../utils/axiosWithAuth'

const formSchema = yup.object().shape({
  username: yup.string().required("full username please"),
  password: yup.string().required("valid password please"),
});

const LoginPage = (props) => {
    const history = useHistory()
  const [formState, setFormState] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(false);

  useEffect(() => {
    formSchema.isValid(formState).then((valid) => {
      setButtonDisabled(!valid);
    });
  }, [formState]);

  const validateChange = (event) => {
    yup
      .reach(formSchema, event.target.name)
      .validate(event.target.value)
      .then((valid) => {
        setErrors({
          ...errors,
          [event.target.name]: "",
        });
      })
      .catch((err) => {
        setErrors({
          ...errors,
          [event.target.name]: err.errors[0],
        });
      });
  };

  // eslint-disable-next-line no-unused-vars
  // user name and password
const [name, setName] = useState([]);

  const formSubmit = (event) => {
      
    event.preventDefault();
    axiosWithAuth()
    .post("https://sleep-tracker-backend.herokuapp.com/auth/login", formState )
    .then((response) => {
      console.log(response);
        localStorage.setItem('token', response.data.token)
      
    })
    .catch((err) => {
      console.log(err.response);
    });
    
      setFormState({
        username: "",
        password: ""
      });
      history.push('/day-logs')
    
  };
  const inputChange = (event) => {
    event.persist();
    setFormState( {
        ...formState,
        [event.target.name]: event.target.value, 
    })
    // const newFormData = {
    //   ...formState,
    //   [event.target.name]: event.target.value,
    // };
    // validateChange(event);
    // setFormState(newFormData);

  };

  const Login = styled.div`
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
         {/* <Login> */}
            <h1>SLEEP-TRACKER LOGIN HERE!</h1>
            <form >
            <label htmlFor="name">
              Username
              <input
                id="name"
                type="text"
                name="username"
                value={formState.username}
                onChange={inputChange}
                data-cy="username"
              />
              {errors.username.length > 0 ? (
                <p className="error">{errors.username}</p>
              ) : null}
            </label>
            <br/><br/>
            <label htmlFor="password">
              Password
              <input
                id="password"
                type="text"
                name="password"
                value={formState.password}
                onChange={inputChange}
                data-cy="password"
              />
              {errors.password.length > 0 ? (
                <p className="error">{errors.password}</p>
              ) : null}
            </label><br/>
            <br/>
              <button type="submit"onClick={formSubmit}>
                LOG IN!
              </button>
          </form>
          {/* </Login> */}
          </>
    </Route>
      );
    };

    
export default LoginPage;