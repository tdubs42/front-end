// Remember your why
import React from "react";

const AddPlantForm = ( props ) => {
    const { values, change, submit, disabled, errors } = props;
    const onSubmit                                     = evt => {
        evt.preventDefault(); // Stops default behavior of reloading browser window onClick
        submit();
    };

    const onChange = evt => {
        const { name, value, type, checked } = evt.target;
        const valueToUse                     = value;

        change( name, valueToUse );
    };

    return (
        <form onSubmit={submit}>
            <label>Plant's Nickname</label>
            <input
                type="text"
                name="nickname"
                placeholder='Hanging plant in living room'
                value={values.nickname}
                onChange={change}
                required
                size="2"
            />
            {errors.nickname.length < 2 && <p className="error">{errors.nickname}</p>}

            <label>Plant's Species</label>
            <input
                type="text"
                name="species"
                placeholder='Araucaria araucana'
                value={values.species}
                onChange={change}
            />

            <label>Watering Instructions</label>
            <textarea
                name="h2oFrequency"
                value={values.h2oFrequency}
                placeholder='Needs water twice a week'
                onChange={change}
                rows="5"
                cols="10"
            />
            {errors.h2oFrequency.length < 5 && <p className="error">{errors.h2oFrequency}</p>}

            {/*<input type='reset' value='Clear Form' />*/}
            <button>Submit</button>
        </form>
    );
};

export default AddPlantForm;