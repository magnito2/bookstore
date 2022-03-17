import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSchoolsStart, deleteSchoolStart } from "../../redux/Schools/schools.actions";
import Modal from "../Modal";
import BooksModal from "./BooksModal";
import SchoolResult from "./SchoolResult";

import "./styles.scss";


const mapState = ({ schoolsData, productsData}) => ({
    schools : schoolsData.schools,
    books : productsData.products
});

const SchoolsResults = ({}) => {
    const { schools, books } = useSelector(mapState);
    const dispatch = useDispatch();
    const [hideBooksModal, setBooksModal] = useState(true);
    const toggleBooksModal = () => setBooksModal(!hideBooksModal);
    const [schoolBooks, setSchoolBooks] = useState([]);
    const [activeSchool, setActiveSchool] = useState({});
    const addSchoolBook = book => setSchoolBooks([...schoolBooks, book])
    const removeSchoolBook = book => {
        const books = schoolBooks.filter(b => b.documentID !== book.documentID);
        setSchoolBooks(books);
    }

    useEffect(() => {
        dispatch(fetchSchoolsStart());
    }, []);

    const handleAddBooks = (school) => {
        setActiveSchool(school);
        toggleBooksModal();
    }

    const handleDeleteSchool = (schoolID) => {
        dispatch(deleteSchoolStart(schoolID))
    }

    const configBooksModal = {
        hideModal : hideBooksModal,
        toggleModal : toggleBooksModal
    }

    const configBooksInnerModal = {
        school: activeSchool,
    }

    const primarySchools = schools.data.filter(school => school.schoolLevel === 'primary');
    const secondarySchools = schools.data.filter(school => school.schoolLevel === 'secondary');
    return (
        <div className="wrap">

            <Modal {...configBooksModal} >
                <BooksModal {...configBooksInnerModal} />
            </Modal>

            {primarySchools.length > 0 ? (
                <div className="schoolsCat">
                <h2>Primary Schools</h2>
                <table>
                    <thead>
                        <tr>
                            <th>S/No.</th>
                            <th>Name</th>
                            <th>Edit</th>
                            <th>Add Books</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        primarySchools.map((school, idx) => (
                        <SchoolResult 
                            school = {school}
                            idx = {idx}
                            handleAddBooks = {handleAddBooks}
                            handleDeleteSchool = {handleDeleteSchool}
                        />
                        ))
                    }
                    </tbody>
                </table>
            </div>
            ) : <p>There is no Primary School listed </p>}
            <div className="schoolsCat">
            <h2>Secondary Schools</h2>
            {secondarySchools.length > 0 ? (
                <table>
                <thead>
                <tr>
                    <th>S/No.</th>
                    <th>Name</th>
                    <th>Edit</th>
                    <th>Add Books</th>
                    <th>Delete</th>
                </tr>
                </thead>
                <tbody>
                {
                    secondarySchools.map((school, idx) => (
                        <SchoolResult 
                            school = {school}
                            idx = {idx}
                            handleAddBooks = {handleAddBooks}
                            handleDeleteSchool = {handleDeleteSchool}
                        />
                    ))
                }
                </tbody>
            </table>
            ): <p>There is no Secondary School listed</p>}
            </div>
        </div>
    );
}

export default SchoolsResults;