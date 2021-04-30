import React, { useEffect, useState } from 'react';
import {Link, useHistory, useParams} from 'react-router-dom';
import { axiosAuth } from '../utils/axiosAuth';
import Nav from './Nav';

// had our api worked, the keys would have been: nickname, species, and h2o_Frequency
// this also affects our values inside the form below
const initialForm = {
    first_name: '',
    last_name: '',
    email: ''
}

// Editting the plant info based on it's ID or canceling it and returning back to its original preset to once again decide on CRUD

export const EditPlant = () => {
  const [plantToEdit, setPlantToEdit] = useState(initialForm);
  //grabbing the id from the url to match up with the api user id 
  const {id} = useParams();
  const history = useHistory();
  
  // grabbing the id data to set to the form
  useEffect(() => {
    axiosAuth().get(`/api/users/${id}`)
      .then(res => {
        console.log('successfully grabbed the data: ', res.data.data)
        setPlantToEdit(res.data.data)
      })
      .catch(err => console.error('something went wrong with the get: ', err))
  }, [id])

  // updating the form data
  const handleSubmit = e => {
    e.preventDefault();
    axiosAuth().put(`/api/users/${id}`, plantToEdit)
      .then(res => {
        console.log('We were able to put: ', res.data)
        setPlantToEdit(res.data)
        history.push(`/my-plants/${id}`)
      })
      .catch(err => console.error('axios.put: something went wrong: ', err))
  }

  const changeHandler = e => {
    e.persist();
    let value = e.target.value;
    setPlantToEdit({
      ...plantToEdit,
      [e.target.name]: value
    })
  }


  return(
    <div>
      <Nav/>
        <form className="add-plant-form" onSubmit={handleSubmit}>
        <h1 className="add-plant-header">Edit Your Plant</h1>
        <div className="input-container">
          <label className="add-plant-label">Plant's Nickname</label>
            <input 
              type='text'
              name='first_name'
              id='first_name'
              value={plantToEdit.first_name}
              onChange={changeHandler}
            />
          <label className="add-plant-label">Plant's Species</label>
            <input 
              type='text'
              name="last_name"
              id="last_name"
              value={plantToEdit.last_name}
              onChange={changeHandler}
            />
          <label className="add-plant-label">Watering Instructions</label>
            <input
              type="text"
              name="email"
              id="email"
              value={plantToEdit.email}
              onChange={changeHandler}
            />
          <div className="form-button-container">
            <button className="add-plant-form-button submit-btn" type="submit">Update Plant</button>            
            <Link to={`/my-plants/${id}`}>
              <button className="add-plant-form-button reset-btn">Cancel</button>
            </Link>
          </div>
          </div>
        </form>
    </div>
  )
}