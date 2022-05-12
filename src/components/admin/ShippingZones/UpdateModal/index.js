import React, { useState } from "react";
import { useDispatch } from "react-redux";
import FormInput from "../../../forms/FormInput";
import Button from "../../../forms/Button";
import { updateShippingZoneStart } from "../../../../redux/Shipping/shipping.actions";

import './styles.scss';

const UpdateModal = ({title, documentID, field, curValue, isArray, toggleModal}) => {
    const [value, setValue] = useState(curValue);
    const dispatch = useDispatch();

    const handleSubmit = e => {
        e.preventDefault();
        if(value){
            dispatch(
                updateShippingZoneStart({
                    documentID,
                    field,
                    value,
                    isArray
                })
            )
        }
        toggleModal();
    }

    const handleCancel = () => {
        setValue(null);
        toggleModal();
    }
    return (
        <div className="updateModal">
            <h2 className="title">{title}</h2>
            <form onSubmit={e => handleSubmit(e)}>
                <FormInput handleChange={(e) => setValue(e.target.value)} value={value} />
                <div className="buttons">
                    <Button type="button" onClick={handleCancel}>CANCEL</Button>
                    <Button type="submit">SAVE</Button>
                </div>
            </form>
        </div>
    )
}

export default UpdateModal;