import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Button from "../../../components/forms/Button";
import FormInput from "../../../components/forms/FormInput";
import FormSelect from "../../../components/forms/FormSelect";
import Modal from "../../../components/Modal"
import SubjectsResults from "../../../components/SubjectsResults";
import { addSubjectStart } from "../../../redux/Subjects/subjects.actions";

import "./styles.scss";

const AdminSubjects = ({}) => {
    
    const dispatch = useDispatch();
    const [hideModal, setHideModal] = useState(true);
    const [subjectLevel, setSubjectLevel] = useState('primary');
    const [subjectName, setSubjectName] = useState('');

    useEffect(()=>{
        
    }, []);

    const resetForm = () => {
        setHideModal(true);
        setSubjectLevel('primary');
        setSubjectName('');
      };

    const handleSubmit = e => {
        e.preventDefault();

        dispatch(
            addSubjectStart({
                subjectLevel,
                subjectName
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
            <div className="addSubjectButton">
                <Button onClick={() => toggleModal()}>
                    Add Subject
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
                        handleChange = { e => setSubjectLevel(e.target.value)}
                    />
                    <FormInput
                        label="Subject Name"
                        type="text"
                        value={subjectName}
                        handleChange={e => setSubjectName(e.target.value)}
                    />
                    <Button type="submit">
                        Add Subject
                    </Button>
                </form>
            </Modal>
            <SubjectsResults />
        </div>
    )
}

export default AdminSubjects;