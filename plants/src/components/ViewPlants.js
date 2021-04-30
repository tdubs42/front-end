import React, { useEffect, useState } from "react";
import { Link }                       from "react-router-dom";
import axios from 'axios';
// import { axiosAuth }                  from "../utils/axiosAuth";
import Nav                            from "./Nav";
import "../styles/ViewPlants.css";

const ViewPlants = () => {
    const [plant, setPlant] = useState( [] );

    useEffect( () => {
        // needed to set a function that handled the axios.get for it to render a .map of the array
        const getData = () => {
            axios.get( `https://reqres.in/api/users?page=2` )
                       .then( res => {
                           console.log( res.data );
                           setPlant( res.data.data );
                       } )
                       .catch( err => console.error( "beep beep nothing: ", err ) );
        };
        getData();
    }, [] );

    return (
        <>
            <Nav/>
            <section className="plant-container">
                {plant.map( ( res ) => (
                    // this should be giving us the details of the plant as a key for the edit form to have the info fill out on the form
                    // check editplantform to see how it gets that data (just not right now)
                    <Link to={`/my-plants/${res.id}`} key={res.id} className="plant-link">
                        <div className="plant-card">
                            <div className='plant-card-accent'>
                            {/*<img src={id.avatar} alt="person"/>*/}
                                <h2 className="plant-name">{res.first_name} {res.last_name}</h2>
                                <h3 className='watering-instructions-title'>Watering Instructions:</h3>
                                <p className='watering-instructions'>
                                    {res.email}
                                </p>
                            </div>
                        </div>
                    </Link>
                ) )}
            </section>
        </>
    );
};

export default ViewPlants;