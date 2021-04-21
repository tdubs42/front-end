// Remember your why
import React, { useEffect, useState } from "react";
import axios                          from "axios";
import * as Yup     from "yup";
import AddPlantForm from "./AddPlantForm";

import initialFormValues from "./data/initialFormValues";
import initialFormErrors from "./data/initialFormErrors";
import yupSchema from "./data/yupSchema";
import { apiURL as API }    from "./data/apiURL";

const AddPlantFormHelperFunctions = () => {
    const initialPlant                = [];
    const initialDisabled             = true;
    const [plants, setPlants]         = useState( initialPlant );
    const [formValues, setFormValues] = useState( initialFormValues );
    const [formErrors, setFormErrors] = useState( initialFormErrors );
    const [disabled, setDisabled]     = useState( initialDisabled );

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
        axios
            .post( API )
            .then( res => {
                console.log(res.data);
                setPlants( [...plants, res.data] );
            } )
            .catch( err => {
                debugger;
            } );
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

// toggles submit button disable depending on Yup validation
    useEffect( () => {
        yupSchema.isValid( formValues )
                 .then( valid => {
                     setDisabled( !valid );
                 } );
    }, [formValues] );

    return (
        <AddPlantForm
            values={plants}
            change={inputChange}
            submit={formSubmit}
            disabled={disabled}
            errors={formErrors}
        />
    )
};

export default AddPlantFormHelperFunctions;