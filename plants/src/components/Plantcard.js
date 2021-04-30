import React, { useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { axiosAuth } from '../utils/axiosAuth';
import Nav from './Nav';

// This component handles the redirection for Editing the card you selected
// or deleting it entirely off the api
export const Plants = () => {
  const [plant, setPlant] = useState([]);
  const {push} = useHistory();
  const {id} = useParams();
  //grabbing the id from the url to match up with the api user id 
  
  useEffect(() => { //using resreq api to allow us to grab the data of the item we're editing
    const getPlants = () =>{
      axiosAuth().get(`/api/users/${id}`)
      .then(res => {
        console.log('resData:', res.data.data)
        setPlant(res.data.data)
      })
      .catch(err => console.error('something went wrong: ', err))
    }
    getPlants();
  },[id]) 

  // this works, but since we're using a public api it wont actually delete the data
  // check the console.log() to see the data has been deleted
  const deletePlant = e => {
    e.preventDefault();
    axiosAuth().delete(`/api/users/${id}`)
      .then(res => {
        console.log('delete successful!')
        setPlant(res.data)
        push('/my-plants')
      })
      .catch(err => console.error('something went wrong: ', err))
  }

  return(
    <>
      <Nav/>
      <section className="plant-container">
        <div className='solo'>
          <div className="plant-card">
            <div className='plant-card-accent'>
              <h2 className="plant-name">{plant.first_name} {plant.last_name}</h2>
              <h3 className='watering-instructions-title'>Watering Instructions:</h3>
              <p className='watering-instructions'>
                {plant.email}
              </p>
            {/* same concept as before, setting up the edit form to be pre-filled out with details based on the id from the api */}
            <Link to={`/edit-plant/${id}`} key={id}>
              <button className="add-plant-form-button submit-btn" >Edit</button>
            </Link>
            <button className="add-plant-form-button reset-btn" onClick={deletePlant}>
              Delete
            </button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}