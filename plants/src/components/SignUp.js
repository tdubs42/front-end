import React, { useState } from "react";
import * as yup                       from "yup";
import { axiosAuth }                  from "../utils/axiosAuth";
import { Link, useHistory }           from "react-router-dom";
import "../styles/SignUp.css";

const schema = yup.object().shape( {
    username: yup.string().required( "user is required" ).min( 6, "please enter a name longer than 6 chars" ),
    password: yup.string().required( "u need a password" ),
    phone_number: yup.number().required( "phone_number is required" )
} );

export default function SignUp () {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        phone_number: "",
    });
    const [errors, setErrors] = useState( {
        username: "",
        password: "",
        phone_number: "",
    } );

    const history = useHistory();

    const onInputChange = event => {
        const newForm = { ...formData, [event.target.name]: event.target.value };
        validation( event );
        setFormData( newForm );
    };

    const handleSubmit = event => {
        event.preventDefault();
        axiosAuth().post('/api/users/register', formData) // refactored with axiosAuth
            .then(res => { 
                localStorage.setItem('token', res.data.token) 
                setFormData({
                    username: '',
                    password: '',
                    phone_number: ''
            })
            history.push('/my-plants')
            console.log(res)
        })
        .catch(err => console.error(err.response))
    }

    const validation= e => {
        yup.reach(schema, e.target.name)
        .validate(e.target.value)
        .then((valid) => {
            setErrors({
                ...errors, [e.target.errors]: " "
            })
        })
        .catch((err) => {
            setErrors({
                ...errors, [e.target.errors]: err.errors[0]
            })
        })
    }

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
                    <label className="sign-up-label" htmlFor="phone_number"> phone_number:
                        <input className="sign-up-input"
                               onChange={onInputChange}
                               name="phone_number"
                               placeholder="telephone_number, please"
                               id="phone_number"
                               type="text"
                               value={formData.phone_number}
                        />
                        {errors.phone_number.length > 0 ? <span className="errors">{errors.phone_number} </span> : null}
                    </label>
                    <br>
                    </br>
                    <Link id='signInLink' to="/">
                        Already a user? <span className='sign-in-cta'>Sign-in!</span>
                    </Link>
                    <button className='sign-up-btn' > Register</button>
                </form>
                </div>
                <img className="sign-in-image"
                     src="https://images.pexels.com/photos/7663988/pexels-photo-7663988.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260"
                     alt="Potted plants hanging and set around a hanging chair"/>
            </div>
        </>
    );
}

