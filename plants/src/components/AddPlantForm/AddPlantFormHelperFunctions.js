// Remember your why
import React, { useEffect, useState } from "react";
import axios                          from "axios";
import * as Yup     from "yup";
import AddPlantForm from "./AddPlantForm";
import yupSchema         from "./yupSchema";

const initialFormValues = {
    nickname: "",
    species: "",
    h2oFrequency: "",
};

const initialFormErrors = {
    nickname: "",
    species: "",
    h2oFrequency: "",
};

const API = 'https://reqres.in/';

const AddPlantFormHelperFunctions = () => {
    const [plants, setPlants]         = useState( [] );
    const [formValues, setFormValues] = useState( initialFormValues );
    const [formErrors, setFormErrors] = useState( initialFormErrors );

// axios GET request
    const getPlants = () => {
        axios
            .get( API )
            .then( res => {
                setPlants( res.data );
            } )
            .catch( err => {
                debugger
            } );
    };

// axios POST request
    const postNewPlant = () => {
        console.log(plants);
        // axios
        //     .post( API )
        //     .then( res => {
        //         console.log(res.data);
        //         setPlants( [...plants, res.data] );
        //     } )
        //     .catch( err => {
        //         debugger;
        //     } );
    };

// Uses Yup for form validation
    const inputChange = ( name, value ) => {
        Yup
            .reach( yupSchema, name )
            .validate( value )
            .then( valid => {
                setFormErrors( {
                                   ...formErrors,
                                   [name]: "",
                               } );
            } )
            .catch( err => {
                setFormErrors( {
                                   ...formErrors,
                                   [name]: err.errors[0],
                               } );
            } );
        setFormValues( { ...formValues, [name]: value } );
    };

// sets state for form submission
    const formSubmit = () => {
        const newPlant = {
            nickname: formValues.nickname.trim(),
            species: formValues.species.trim(),
            h2oFrequency: formValues.h2oFrequency.trim(),
        };

        postNewPlant( newPlant );
        setFormValues( initialFormValues );
    };

    return (
        <AddPlantForm
            values={plants}
            change={inputChange}
            submit={formSubmit}
            errors={formErrors}
        />
    )
};

export default AddPlantFormHelperFunctions;