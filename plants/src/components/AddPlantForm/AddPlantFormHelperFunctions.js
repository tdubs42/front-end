// Remember your why
import * as Yup                       from "yup";
import React, { useEffect, useState } from "react";
import axios                          from "axios";
import AddPlantForm                   from "./AddPlantForm";

const yupSchema = Yup.object().shape( {
                                          nickname: Yup
                                              .string()
                                              .required("Required")
                                              .min( 2 ),
                                          species: Yup
                                              .string()
                                              .max( 200 ),
                                          h2oFrequency: Yup
                                              .string()
                                              .required( "How often do we need to water this one?" )
                                              .min( 5 ),
                                      } );

const initialFormValues = {
    nickname: "",
    species: "",
    h2oFrequency: "",
};

const API = "http://fakeapi.jsonparseronline.com/posts";

const AddPlantFormHelperFunctions = () => {
    const [plants, setPlants]         = useState( [] );
    const [formValues, setFormValues] = useState( initialFormValues );
    const [formErrors, setFormErrors] = useState( initialFormValues );
    const [disabled, setDisabled]     = useState( true );

// axios GET request
//     const getPlants = () => {
//         axios
//             .get( API )
//             .then( res => {
//                 setPlants( res.data );
//             } )
//             .catch( err => {
//                 debugger
//             } );
//     };

// axios POST request
    const postNewPlant = () => {
        axios
            .post( API )
            .then( res => {
                setPlants( [...plants, res.data] );
                setFormValues( initialFormValues );
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
            .then( () => {
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
    };

    useEffect( () => {
        yupSchema.isValid( formValues ).then( valid => {
            setDisabled( !valid );
        });
    }, [formValues] )


    return (
        <AddPlantForm
            values={formValues}
            change={inputChange}
            submit={formSubmit}
            errors={formErrors}
            disabled={disabled}
        />
    );
};

export default AddPlantFormHelperFunctions;