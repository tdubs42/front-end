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

    const formReset = () => {
        document.getElementById("nickname").value = "";
        document.getElementById("species").value = "";
        document.getElementById("h2oFrequency").value = "";
    }

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
                    value={values.nickname}
                    onChange={onChange}
                />
                <p className="error">{errors.nickname}</p>

                <label className="add-plant-label">Plant's Species</label>
                <input
                    type="text"
                    name="species"
                    id="species"
                    placeholder="Araucaria araucana"
                    value={values.species}
                    onChange={onChange}
                />

                <label className="add-plant-label">Watering Instructions</label>
                <input
                    type="text"
                    name="h2oFrequency"
                    id="h2oFrequency"
                    placeholder="Needs water twice a week"
                    value={values.h2oFrequency}
                    onChange={onChange}
                />
                <p className="error">{errors.h2oFrequency}</p>

                <div className="form-button-container">
                    <button className="add-plant-form-button submit-btn" type="submit" disabled={disabled}>Add Plant</button>
                    <button className="add-plant-form-button reset-btn" onClick={formReset}>Reset Form</button>
                </div>
            </div>
        </form>
    );
};

export default AddPlantForm;