import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Button from "../../../components/forms/Button";
import FormInput from "../../../components/forms/FormInput";
import FormSelect from "../../../components/forms/FormSelect";
import Modal from "../../../components/Modal"
import SchoolsResults from "../../../components/SchoolsResults";
import { addSchoolStart } from "../../../redux/Schools/schools.actions";

import "./styles.scss";


const AdminSchools = ({}) => {

    const dispatch = useDispatch();
    const [hideModal, setHideModal] = useState(true);
    const [schoolLevel, setSchoolLevel] = useState('primary');
    const [schoolName, setSchoolName] = useState('');

    const resetForm = () => {
        setHideModal(true);
        setSchoolLevel('primary');
        setSchoolName('');
      };

    const handleSubmit = e => {
        e.preventDefault();

        dispatch(
            addSchoolStart({
                schoolLevel,
                schoolName
            })
        )
        resetForm();
    }

    const toggleModal = () => setHideModal(!hideModal);
    const configModal = {
        hideModal,
        toggleModal
      };

    return (
        <div>
            <div className="addSchoolButton">
                <Button onClick={() => toggleModal()}>
                    Add School
                </Button>
            </div>
            <Modal {...configModal}>
                <form onSubmit={handleSubmit}>
                    <FormSelect 
                        label="Level"
                        options={[
                            {
                                value: "primary",
                                name: 'Primary'
                            },
                            {
                                value: 'secondary',
                                name: 'Secondary'
                            }
                        ]}
                        handleChange = { e => setSchoolLevel(e.target.value)}
                    />
                    <FormInput
                        label="School Name"
                        type="text"
                        value={schoolName}
                        handleChange={e => setSchoolName(e.target.value)}
                    />
                    <Button type="submit">
                        Add School
                    </Button>
                </form>
            </Modal>
            <SchoolsResults />
        </div>
    );
}

export default AdminSchools;