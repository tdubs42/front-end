// dont forget to do form validations with yup
import React, { useState,useEffect } from 'react'
import * as yup from 'yup'
import './App.css';
import axios from 'axios';



const schema = yup.object().shape({
    fname: yup.string().required('user is required').min(6, 'please enter a name longer than 6 chars'),
    email: yup.string().required('email is required').min(6, 'please enter a valid email address'),
    phone: yup.number().required('phone is required').min(12, 'please enter your telephone number, including dashes'),
    password: yup.string().required('u need a password')
})

export default function SignUp(){
    const [formData, setFormData] = useState({
        fname: '',
        email: '',
        password: '',
        phone: ''
    
    }) 


    const [errors, setErrors] = useState({
        fname: '',
        email: '',
        password: '',
        phone: ''
    
    }) 

   
     const [disabled, setDisabled] = useState(true)

    const onInputChange = event => {
        // const { form, value, type, name } = event.target
        event.persist()
        // const valueToUse = type === 'text'? name :  value
        const newForm= {...formData,[event.target.name]: event.target.value}
        validation(event)
        setFormData(newForm)
    }

    const handleSubmit= event => {
        event.preventDefault();
         axios.post('https://reqres.in/api/register', formData)
         .then(res => { 
             localStorage.setItem('token', res.data.token
             ) 
             setFormData({
                fname: '',
                email: '',
                password: '',
                phone: ''
             })
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

    

    useEffect(() => {
        schema.isValid(formData).then(valid => {
            setDisabled(!valid)
        })
  }, [formData])

        

     

     return (
        <div className="signUp">
       

            <form onSubmit = {handleSubmit}>

                <label htmlFor='fname'>Name:   

                <input onChange={onInputChange}
               name='fname'
                maxLength='15'
                placeholder='name, please'
                id='fname'
                type='text'
                value={formData.fname}
                />
               {errors.fname.length > 0 ? <span className = "errors">{errors.fname} </span> : null }
               </label>
<br>
</br>

<label htmlFor='email'> email:    

<input onChange={onInputChange}
                 name='email'
                maxLength='15'
                placeholder='e.mail, please'
                id='email'
                type='email'
                value={formData.email}
                />
{errors.email.length > 0 ? <span className = "errors">{errors.email} </span> : null }
</label>

                <br>
                </br>


<label htmlFor='password'>password:    

<input onChange={onInputChange}
                name='password'
                maxLength='15'
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

<input onChange={onInputChange}
                name='phone'
                maxLength='15'
                placeholder='telephone, please'
                id='phone'
                type='text'
                value={formData.phone}
                />
{errors.phone.length > 0 ? <span className = "errors">{errors.phone} </span> : null }
</label>
                <br>
                </br>

                <button > submit info </button>
            </form>
            
        </div>
    )
     }

