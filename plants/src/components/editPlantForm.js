import axios from 'axios';
import React from 'react';
import {useHistory} from 'react-router-dom';
import { axiosAuth } from '../utils/axiosAuth';


export const EditPlant = (props) => {
  const history = useHistory();

  const handleSubmit = e => {
    e.preventDefault();
    axiosAuth().put(`api/users`, )
  }

  return(
    <div>
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
            <button className="add-plant-form-button submit-btn" type="submit">Add Plant</button>
          </div>
        </form>
      </div>
    </div>
  )
}