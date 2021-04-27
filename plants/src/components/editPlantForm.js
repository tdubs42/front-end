import React from 'react';
import {useHistory} from 'react-router-dom';


export const EditPlant = (props) => {
  const push = useHistory();

  const handleSubmit = e => {
    e.preventDefault();
    push('/my-plants')
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