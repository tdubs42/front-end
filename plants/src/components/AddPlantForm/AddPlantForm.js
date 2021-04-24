// Remember your why
import React from "react";

const AddPlantForm = ( props ) => {
    const { values, change, submit, errors, disabled } = props;
    const onSubmit                                     = evt => {
        evt.preventDefault(); // Stops default behavior of reloading browser window onClick
        submit();
    };

    const onChange = evt => {
        const { name, value } = evt.target;
        change( name, value );
    };

    return (
        <form onSubmit={onSubmit}>
            <label>Plant's Nickname</label>
            <input
                type="text"
                name="nickname"
                placeholder='Hanging plant in living room'
                value={values.nickname}
                onChange={onChange}
            />
            <p className="error">{errors.nickname}</p>

            <label>Plant's Species</label>
            <input
                type="text"
                name="species"
                placeholder='Araucaria araucana'
                value={values.species}
                onChange={onChange}
            />

            <label>Watering Instructions</label>
            <input
                type='text'
                name="h2oFrequency"
                placeholder='Needs water twice a week'
                value={values.h2oFrequency}
                onChange={onChange}
            />
            <p className="error">{errors.h2oFrequency}</p>

            <input type='reset' value='Clear Form' />
            <button disabled={disabled}>Add Plant</button>
        </form>
    );
};

export default AddPlantForm;