import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import { axiosAuth } from '../utils/axiosAuth';


const ViewPlants = () => {
  const [plant, setPlant] = useState([]);

  useEffect(() => {
    axiosAuth().get(`/api/users?page=2`)
      .then(res => {
        console.log(res.data);
        setPlant(res.data.data)
      })
      .catch(err => console.error('beep beep nothing: ', err))
  },[])
  
  
  return(
    <div>
      <p>{plant.email}</p>
      {/* <ul>
        <Link to='/edit-plant'><li>1</li></Link>
        <li>2</li>
        <li>3</li>
      </ul> */}
    </div>
  )
}

export default ViewPlants