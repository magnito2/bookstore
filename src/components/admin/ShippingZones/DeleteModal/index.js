import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateShippingZoneStart } from "../../../../redux/Shipping/shipping.actions";
import Button from "../../../forms/Button";


const DeleteModal = ({title, documentID, field, curValue, toggleModal}) => {
    const dispatch = useDispatch();

    const handleDelete = () => {
        dispatch(
            updateShippingZoneStart({
                documentID,
                field,
                value: curValue,
                isArray: true,
                removeValue: true
            })
        )
        toggleModal();
    }

    const handleCancel = () => {
        toggleModal();
    }
    return (
        <div>
            <h2 className="title">{title}</h2>
            <p>Do you want to delete {curValue} from {documentID}/{field}</p>
            <div className="actions">
                <Button onClick={handleCancel}>NO</Button>
                <Button onClick={handleDelete}>YES</Button>
            </div>
        </div>
    )
}

export default DeleteModal;