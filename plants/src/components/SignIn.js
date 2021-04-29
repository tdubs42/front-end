import React, { useEffect, useState } from "react";
import { axiosAuth }                  from "../utils/axiosAuth";
import * as Yup                       from "yup";
import "yup-phone";
import { Link, useHistory }           from "react-router-dom";
import "../styles/SignIn.css";

//InitialState
const initialState = {
    username: "",
    phone: "",
    password: "",
};

// formSchema using Yup
const formSchema = Yup.object().shape( {
                                           username: Yup.string()
                                                        .trim()
                                                        .required( "A username is required" )
                                                        .min( 4, "Must be at least 4 characters" ),
                                           phone: Yup.string()
                                                     .phone()
                                                     .required( "A phone number is required" ),
                                           password: Yup.string()
                                                        .required( "A password is required" )
                                                        .min( 6, "Must be at least 6 characters" ),
                                       } );

// SignIn component
const SignIn = () => {
    const [formState, setFormState]           = useState( initialState );
    const [buttonDisabled, setButtonDisabled] = useState( true );
    const [errors, setErrors]                 = useState( initialState );

    const history = useHistory();

    useEffect( () => {
        formSchema.isValid( formState ).then( ( valid ) => {
            setButtonDisabled( !valid );
        } );
    }, [formState] );

    function validateChange ( e ) {
        Yup.reach( formSchema, e.target.name )
           .validate( e.target.value )
           .then( () => {
               setErrors( { ...errors, [e.target.name]: "" } );
           } )
           .catch( ( err ) => {
               setErrors( { ...errors, [e.target.name]: err.errors[0] } );
           } );
    }

    const change = ( e ) => {
        const { name, value } = e.target;
        validateChange( e );
        setFormState( { ...formState, [name]: value } );
        setErrors( name, value );
    };

    // onSubmit function
    const submit = ( e ) => {
        e.preventDefault();
        axiosAuth() //if successful, sets token to localstorage, can make logout if we remove the localstorage
            .post(
                "/api/login", // refactored with axiosAuth
                formState,
            )
            .then( ( res ) => {
                console.log( res );
                localStorage.setItem( "token", res.data.token );
                history.push( "/my-plants" );
            } )
            .catch( ( err ) => console.error( "failed logging in: ", err ) );
    };

    return (
        <>
            <header>
                <h1 className="sign-in-header">Water Your Plants!</h1>
            </header>
            <div className="sign-in-img-container">
                <img className="sign-in-image"
                     src="https://images.pexels.com/photos/7663988/pexels-photo-7663988.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260"
                     alt="Potted plants hanging and set around a hanging chair"/>
                <section className="sign-in-container">
                    <form className="sign-in-form" onSubmit={submit}>
                        <h2 className='sign-in-title'>Sign in</h2>
                        <label className="sign-in-label" htmlFor="username">
                            Username:
                        </label>
                        <input className="sign-in-input"
                               type="text"
                               name="username"
                               placeholder="Enter your username"
                               value={formState.username}
                               onChange={change}
                        />
                        <p>{errors.username}</p>

                        <label className="sign-in-label" htmlFor="phone">
                            Phone Number:
                        </label>
                        <input className="sign-in-input"
                               type="text"
                               name="phone"
                               placeholder="Enter your phone number"
                               value={formState.phone}
                               onChange={change}
                        />
                        <p>{errors.phone}</p>

                        <label className="sign-in-label" htmlFor="password">
                            Password:
                        </label>
                        <input className="sign-in-input"
                               type="password"
                               name="password"
                               placeholder="Enter your password"
                               value={formState.password}
                               onChange={change}
                        />
                        <p className="error">{errors.password}</p>

                        <button className="sign-in-btn" disabled={buttonDisabled}>
                            Sign In
                        </button>
                        <Link id='signUpLink' to="/sign-up">
                            Need an account? <span className='sign-up-cta'>Sign-up</span>
                        </Link>
                    </form>
                </section>
            </div>
        </>
    );
};

export default SignIn;
