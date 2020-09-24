// * dependencies 
import React, { useState, useEffect } from "react";
import { Route, Link } from "react-router-dom";
import * as yup from "yup";
import axios from "axios";
import styled from "styled-components";

const formSchema = yup.object().shape({
  name: yup.string().required("full name please"),
  email: yup.string().email().required("valid email please"),
});

const LoginPage = (props) => {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(true);

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

  const Login = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 3%;
  color: #3d040b;
    `;
  // eslint-disable-next-line no-unused-vars
  const [name, setName] = useState([]);

  const formSubmit = (event) => {
    event.preventDefault();
    axios
      .post("https://reqres.in/api/users", formState)
      .then((response) => {
        setName(response.data);

        setFormState({
          name: "",
        });
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  const inputChange = (event) => {
    event.persist();
    const newFormData = {
      ...formState,
      [event.target.name]: event.target.value,
    };
    validateChange(event);
    setFormState(newFormData);
  };
  

  return (
    <Route> 
      <Login>
        <>
        
            <h1>SLEEP-TRACKER LOGIN HERE!</h1>
            <form onSubmit={formSubmit}>
            <label htmlFor="name">
              Name
              <input
                id="name"
                type="text"
                name="name"
                value={formState.name}
                onChange={inputChange}
                data-cy="name"
              />
              {errors.name.length > 0 ? (
                <p className="error">{errors.name}</p>
              ) : null}
            </label>
            <br/><br/>
            <label htmlFor="email">
              Email
              <input
                id="email"
                type="text"
                name="email"
                value={formState.email}
                onChange={inputChange}
                data-cy="email"
              />
              {errors.email.length > 0 ? (
                <p className="error">{errors.email}</p>
              ) : null}
            </label><br/>
            <br/>
            <Link to="/">
              <button disabled={buttonDisabled} type="submit">
                LOG IN!
              </button>
            </Link>{" "}
          </form>
      
          </>
          </Login>
    </Route>
      );
    };
export default LoginPage;