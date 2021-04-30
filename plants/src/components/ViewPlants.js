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
                    // We're mapping through the state of Plant to grab individual pieces of data groups and put them in their own cards
                    // and each card will link to a CRUD card with its info based on its id
                    <Link to={`/my-plants/${res.id}`} key={res.id} className="plant-link">
                        <div className="plant-card">
                            <div className='plant-card-accent'>
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