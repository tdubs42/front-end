// Remember your why
import * as Yup                       from "yup";
import React, { useEffect, useState } from "react";
import axios                          from "axios";
import "../styles/AddPlantForm.css";

const yupSchema = Yup.object().shape( {
                                          nickname: Yup
                                              .string()
                                              .required()
                                              .typeError( "Required" )
                                              .min( 2 ),
                                          species: Yup
                                              .string()
                                              .max( 200 ),
                                          h2oFrequency: Yup
                                              .string()
                                              .required()
                                              .typeError( "How often do we need to water this one?" )
                                              .min( 5 ),
                                      } );

const initialFormValues = {
    nickname: "",
    species: "",
    h2oFrequency: "",
};

const API = "http://fakeapi.jsonparseronline.com/posts";

const AddPlantForm = () => {
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
                console.log( err );
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
        } );
    }, [formValues] );

    const onSubmit = evt => {
        evt.preventDefault(); // Stops default behavior of reloading browser window onClick
        formSubmit();
    };

    const onChange = evt => {
        const { name, value } = evt.target;
        inputChange( name, value );
    };

    const formReset = () => {
        document.getElementById( "nickname" ).value     = "";
        document.getElementById( "species" ).value      = "";
        document.getElementById( "h2oFrequency" ).value = "";
    };

    return (
        <form className="add-plant-form" onSubmit={onSubmit}>
            <h1 className="add-plant-header">Add a Plant</h1>
            <div className="input-container">
                <label className="add-plant-label">Plant's Nickname</label>
                <input
                    type="text"
                    name="nickname"
                    id="nickname"
                    placeholder="Hanging plant in living room"
                    value={formValues.nickname}
                    onChange={onChange}
                />
                <p className="error">{formErrors.nickname}</p>

                <label className="add-plant-label">Plant's Species</label>
                <input
                    type="text"
                    name="species"
                    id="species"
                    placeholder="Araucaria araucana"
                    value={formValues.species}
                    onChange={onChange}
                />

                <label className="add-plant-label">Watering Instructions</label>
                <input
                    type="text"
                    name="h2oFrequency"
                    id="h2oFrequency"
                    placeholder="Needs water twice a week"
                    value={formValues.h2oFrequency}
                    onChange={onChange}
                />
                <p className="error">{formErrors.h2oFrequency}</p>

                <div className="form-button-container">
                    <button className="add-plant-form-button submit-btn" type="submit" disabled={disabled}>Add Plant
                    </button>
                    <button className="add-plant-form-button reset-btn" onClick={formReset}>Reset Form</button>
                </div>
            </div>
        </form>
    );
};

export default AddPlantForm;