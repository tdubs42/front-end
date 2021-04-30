import React, { useEffect, useState } from "react";
import * as yup                       from "yup";
import { axiosAuth }                  from "../utils/axiosAuth";
import { Link, useHistory }           from "react-router-dom";
import "../styles/SignUp.css";

const schema = yup.object().shape( {
    username: yup.string().required( "user is required" ).min( 6, "please enter a name longer than 6 chars" ),
    phone: yup.number().required( "phone is required" ),
    password: yup.string().required( "u need a password" ),
} );

export default function SignUp () {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        phone: "",
    });
    const [errors, setErrors] = useState( {
        username: "",
        password: "",
        phone: "",
    } );
    const [disabled, setDisabled] = useState( true );
    const history = useHistory();

    const onInputChange = event => {
        // const { form, value, type, name } = event.target
        // const valueToUse = type === 'text'? name :  value
        const newForm = { ...formData, [event.target.name]: event.target.value };
        validation( event );
        setFormData( newForm );
    };

    const handleSubmit = event => {
        event.preventDefault();
        axiosAuth().post( "/api/register", formData ) // refactored with axiosAuth
            .then( res => {
                localStorage.setItem( "token", res.data.token );
                setFormData({
                    username: "",
                    password: "",
                    phone: "",
                });
                history.push( "/my-plants" );
                console.log( res );
            } )
            .catch( err => console.error( err.response ) );
    };

    const validation = (name, value) => {
        yup.reach( schema, name )
           .validate( value )
           .then( () => {
               setErrors( {
                              ...errors, [name]: "",
                          } );
           } )
           .catch( ( err ) => {
               setErrors( {
                              ...errors, [name]: err.errors[0],
                          } );
           } );

        setFormData( { ...formData, [name]: value } );
    };

    useEffect( () => {
        schema.isValid( formData ).then( valid => {
            setDisabled( !valid );
        } );
    }, [formData] );

    return (
        <>
            <header>
                <h1 className="sign-up-header">Water Your Plants!</h1>
            </header>
            <div className="sign-up-img-container">
                <div className='sign-up-container'>
                <form className="sign-up-form" onSubmit={handleSubmit}>
                    <h2 className="sign-up-title">Sign up</h2>
                    <label className="sign-up-label" htmlFor="username">Name:</label>
                    <input className="sign-up-input"
                           onChange={onInputChange}
                           name="username"
                           placeholder="name, please"
                           id="username"
                           type="text"
                           value={formData.username}
                    />
                    {errors.username.length > 0 ? <span className="errors">{errors.username} </span> : null}

                    <label className="sign-up-label" htmlFor="password">password:
                        <input className="sign-up-input"
                               onChange={onInputChange}
                               name="password"
                               placeholder="password"
                               id="password"
                               type="text"
                               value={formData.password}
                        />
                        {errors.password.length > 0 ? <span className="errors">{errors.password} </span> : null}
                    </label>
                    <label className="sign-up-label" htmlFor="phone"> phone:
                        <input className="sign-up-input"
                               onChange={onInputChange}
                               name="phone"
                               placeholder="telephone, please"
                               id="phone"
                               type="text"
                               value={formData.phone}
                        />
                        {errors.phone.length > 0 ? <span className="errors">{errors.phone} </span> : null}
                    </label>
                    <br>
                    </br>
                    <Link id='signInLink' to="/">
                        Already a user? <span className='sign-in-cta'>Sign-in!</span>
                    </Link>
                    <button className='sign-up-btn' disabled={disabled}> Register</button>
                </form>
                </div>
                <img className="sign-in-image"
                     src="https://images.pexels.com/photos/7663988/pexels-photo-7663988.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260"
                     alt="Potted plants hanging and set around a hanging chair"/>
            </div>
        </>
    );
}

