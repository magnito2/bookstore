import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSchoolsStart } from "../../redux/Schools/schools.actions";
import { fetchProductsStart } from "../../redux/Products/products.actions";

import './styles.scss';

const mapState = ({ schoolsData }) => ({
    schools: schoolsData.schools.data
})
const FilterSchools = ({}) => {
    const dispatch = useDispatch();
    const { schools } = useSelector(mapState);

    useEffect(() => {
        dispatch(
            fetchSchoolsStart()
        );
    }, []);

    return (
        <div>
            <ul>
                {
                    schools.map((school,idx) => {
                        return <li 
                        key={idx}
                        onClick={() => dispatch(
                            fetchProductsStart({
                                filters: {
                                    schoolID: school.documentID
                                }
                            })
                        )}
                        >
                            {school.schoolName}
                        </li>
                    })
                }
            </ul>
        </div>
    );
}

export default FilterSchools;