import React, { useState, useEffect } from "react";
import axios from "axios";
import * as Yup from "yup";
import 'yup-phone';
import { Link } from "react-router-dom";

//InitialState
const initialState = {
  username: '',
  phone: '',
  password: '',
};

// formSchema using Yup
const formSchema = Yup.object().shape({
  username: Yup.string()
    .trim()
    .required('A username is required')
    .min(4, 'Must be at least 4 characters'),
  phone: Yup.string()
    .phone()
    .required('A phone number is required'),
  password: Yup.string()
    .required('A password is required')
    .min(6, 'Must be at least 6 characters'),
});

// SignIn component
const SignIn = () => {
  const [formState, setFormState] = useState(initialState);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [errors, setErrors] = useState(initialState);

  useEffect(() => {
    formSchema.isValid(formState).then((valid) => {
      setButtonDisabled(!valid);
    });
  }, [formState]);

  function validateChange(e) {
    Yup.reach(formSchema, e.target.name)
      .validate(e.target.value)
      .then(() => {
        setErrors({ ...errors, [e.target.name]: "" });
      })
      .catch((err) => {
        setErrors({ ...errors, [e.target.name]: err.errors[0] });
      });
  }

  const change = (e) => {
    const { name, value } = e.target;
    validateChange(e);
    setFormState({ ...formState, [name]: value });
    setErrors(name, value);
  };

  // onSubmit function
  const submit = (e) => {
    e.preventDefault();
    axios //if successful, sets token to localstorage, can make logout if we remove the localstorage
      .post(
        'https://reqres.in/api/login',
        formState
      )
      .then((res) => {
        console.log(res)
        localStorage.setItem('token', res.data.token); 
      })
      .catch((err) => console.error('failed logging in: ', err));
  };

  return (
    <div>
      <h1>Water Your Plants!</h1>
      <section className='sign-in-container'>
        <section>
          <h2>Sign in</h2>
          <form onSubmit={submit}>
            <label htmlFor='username'>
              Username:
              <input
                type='text'
                name='username'
                placeholder='Enter your username'
                value={formState.username}
                onChange={change}
              />
              <p>{errors.username}</p>
            </label>
            <label htmlFor='phone'>
              Phone Number:
              <input
                type='text'
                name='phone'
                placeholder='Enter your phone number'
                value={formState.phone}
                onChange={change}
              />
              <p>{errors.phone}</p>
            </label>
            <label htmlFor='password'>
              Password:
              <input
                type='password'
                name='password'
                placeholder='Enter your password'
                value={formState.password}
                onChange={change}
              />
              <p className='error'>{errors.password}</p>
            </label>
            <button disabled={buttonDisabled}>
              Sign In
            </button>
            <br></br>
            <br></br>
            <Link to='/sign-up'>
              Need an account? Sign-up
            </Link>
            <br></br>
          </form>
        </section>
      </section>
    </div>
  );
};

export default SignIn;
