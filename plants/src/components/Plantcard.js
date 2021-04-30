import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { axiosAuth } from '../utils/axiosAuth';
import Nav from './Nav';

export const Plants = (props) => {
  const [plant, setPlant] = useState([]);
  const {push} = props.history;

  const plantId = props.match.params.id;
  useEffect(() => { //using resreq api to allow us to grab the data of the item we're editing
    axiosAuth().get(`https://reqres.in/api/users/${plantId}`)
      .then(res => {
        console.log('resData:', res.data.data)
        setPlant(res.data.data)
      })
      .catch(err => console.error('something went wrong: ', err))
  }, [plantId]) 

  // this works, but since we're using a public api it wont actually delete the data
  // check the console.log() to see the data is now empty
  const deletePlant = e => {
    e.preventDefault();
    axiosAuth().delete(`https://reqres.in/api/users/${plantId}`)
      .then(res => {
        console.log(res)
        setPlant(res.data)
        push('/my-plants')
      })
      .catch(err => console.error('something went wrong: ', err))
  }

  return(
    <>
      <Nav/>
      <section className="plant-container">
        <div className="plant-card">
          <div className='plant-card-accent'>
            <h2 className="plant-name">{plant.first_name} {plant.last_name}</h2>
            <h3 className='watering-instructions-title'>Watering Instructions:</h3>
            <p className='watering-instructions'>
              {plant.email}
            </p>
            
          <Link to={`/edit-plant/${plantId}`} key={plantId}>
            <button className="">Edit</button>
          </Link>
          <button onClick={deletePlant}>
            Delete
          </button>
          </div>
        </div>
      </section>
    </>
  )
}