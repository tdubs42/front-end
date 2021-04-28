import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import { axiosAuth } from '../utils/axiosAuth';
import Nav from './Nav';


const ViewPlants = () => {
  const [plant, setPlant] = useState([]);

  useEffect(() => {
    // needed to set a function that handled the axios.get for it to render a .map of the array
    const getData = () => {
      axiosAuth().get(`/api/users?page=2`)
        .then(res => {
          console.log(res.data);
          setPlant(res.data.data)
        })
        .catch(err => console.error('beep beep nothing: ', err))
    }
    getData()
  },[])
  
  
  return(
    <>
    <Nav />
    {plant.map((id) => (
      // this should be giving us the details of the plant as a key for the edit form to have the info fill out on the form 
      // check editplantform to see how it gets that data (just not right now)
      <Link to={`/edit-plant/${id.id}`} key={id.id} className="plant-link">
        <div>
          <img src={id.avatar} alt='person' />
          <h2>{id.first_name} {id.last_name}</h2>
          <p>
            <b>Instructions: </b>
            {id.email}
          </p>
        </div>
        <br></br>
        <br></br>
      </Link>
    ))}
  </>
  )
}

export default ViewPlants