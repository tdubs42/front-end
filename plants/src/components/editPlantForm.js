import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { axiosAuth } from '../utils/axiosAuth';
import Nav from './Nav';

export const EditPlant = (props) => {
  const [plantToEdit, setPlantToEdit] = useState('');
  const {push} = useHistory();
  const handleSubmit = e => {
    e.preventDefault();
    axiosAuth().put(`api/users`, )
  }

  return(
    <div>
      <Nav/>
      <h1>Edit your plant</h1>
      <div>
        <form onSubmit={handleSubmit}>
          <label>Plant's Nickname</label>
            <input 
              type='text'
              name='nickname'
              id='nickname'
            />
          <label className="add-plant-label">Plant's Species</label>
            <input 
              type='text'
              name="species"
              id="species"
            />
          <label className="add-plant-label">Watering Instructions</label>
            <input
              type="text"
              name="h2oFrequency"
              id="h2oFrequency"
            />
          <div className="form-button-container">
            <button className="add-plant-form-button submit-btn" type="submit">Update Plant</button>
            <button>Delete</button>
            <button>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  )
}