import React, { useState } from 'react'
import * as yup from 'yup'
import { axiosAuth } from '../utils/axiosAuth';
import {Link, useHistory} from 'react-router-dom';


const schema = yup.object().shape({
    username: yup.string().required('user is required').min(6, 'please enter a name longer than 6 chars'),
    // email: yup.string().required('email is required').min(6, 'please enter a valid email address'),
    phone_number: yup.string().required('phone is required'),
    password: yup.string().required('u need a password')
})

export default function SignUp(){
    const [formData, setFormData] = useState({
        username: '',
        // email: '',
        password: '',
        phone_number: ''
    
    }) 
    const [errors, setErrors] = useState({
        username: '',
        // email: '',
        password: '',
        phone_number: ''
    }) 
    const history = useHistory();

    const onInputChange = event => {
        // const { form, value, type, name } = event.target
        // const valueToUse = type === 'text'? name :  value
        const newForm= {...formData,[event.target.name]: event.target.value}
        validation(event)
        setFormData(newForm)
    }

    const handleSubmit= event => {
        event.preventDefault();
        axiosAuth().post('/api/users/register', formData) // refactored with axiosAuth
            .then(res => { 
                localStorage.setItem('token', res.data.token) 
                setFormData({
                    username: '',
                    // email: '',
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
        <div className="signUp">
            <form onSubmit = {handleSubmit}>
                <label htmlFor='username'>Username:   
                <input onChange={onInputChange}
                    name='username'
                    placeholder='name, please'
                    id='username'
                    type='text'
                    value={formData.username}
                />
                {errors.username.length > 0 ? <span className = "errors">{errors.username} </span> : null }
                </label>
            <br>
            </br>
                <label htmlFor='password'>password:    
                <input 
                    onChange={onInputChange}
                    name='password'
                    placeholder='password'
                    id='password'
                    type='text'
                    value={formData.password}
                />
                {errors.password.length > 0 ? <span className = "errors">{errors.password} </span> : null }
                </label>
            <br>
            </br>
                <label htmlFor='phone'> phone:   
                <input 
                    onChange={onInputChange}
                    name='phone_number'
                    placeholder='telephone, please'
                    id='phone_number'
                    type='text'
                    value={formData.phone_number}
                />
                {errors.phone_number.length > 0 ? <span className = "errors">{errors.phone_number} </span> : null }
                </label>
                <br>
                </br>
                <Link to='/'>
                    Already a user? Sign-in!
                </Link>
                <br></br>
                <button > Register </button>
            </form>
    </div>
    )
}

