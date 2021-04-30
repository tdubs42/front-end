import React, { useState, useEffect } from "react";
import { axiosAuth } from "../utils/axiosAuth";
import * as Yup from "yup";
import 'yup-phone';
import { Link , useHistory} from "react-router-dom";

//InitialState
const initialState = {
  username: '',
  password: '',
  phone_number: '',
};

// formSchema using Yup
const formSchema = Yup.object().shape({
  username: Yup.string()
    .trim()
    .required('A username is required')
    .min(2, 'Must be at least 4 characters'),
    password: Yup.string()
    .required('A password is required'),
    // .min(6, 'Must be at least 6 characters'),
    phone_number: Yup
      .string()
      .required('A phone number is required')
});

// SignIn component
const SignIn = () => {
  const [formState, setFormState] = useState(initialState);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [errors, setErrors] = useState(initialState);

  const history = useHistory()

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
    axiosAuth() //if successful, sets token to localstorage, can make logout if we remove the localstorage
      .post(
        '/api/users/login', // refactored with axiosAuth
        formState
      )
      .then((res) => {
        console.log(res)
        localStorage.setItem('token', res.data.token); 
        history.push('/my-plants')
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
                name='phone_number'
                placeholder='Enter your phone number'
                value={formState.phone_number}
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
