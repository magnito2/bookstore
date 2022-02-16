import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSchoolsStart, deleteSchoolStart } from "../../redux/Schools/schools.actions";

import "./styles.scss";


const mapState = state => ({
    schools : state.schoolsData.schools,
});

const SchoolsResults = ({}) => {
    const { schools } = useSelector(mapState);
    const dispatch = useDispatch()
    
    useEffect(() => {
        dispatch(fetchSchoolsStart());
    }, []);

    const primarySchools = schools.data.filter(school => school.schoolLevel === 'primary');
    const secondarySchools = schools.data.filter(school => school.schoolLevel === 'secondary');
    return (
        <div className="wrap">
            {primarySchools.length > 0 ? (
                <div className="schoolsCat">
                <h2>Primary Schools</h2>
                <table>
                    <tr>
                        <th>S/No.</th>
                        <th>Name</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                    {
                        primarySchools.map((school, idx) => (
                            <tr>
                                <td>{idx + 1}</td>
                                <td>{school.schoolName}</td>
                                <td></td>
                                <td>
                                    <span className="delete" onClick={() => dispatch(deleteSchoolStart(school.documentID))}>X</span>
                                </td>
                            </tr>
                        ))
                    }
                </table>
            </div>
            ) : <p>There is no Primary School listed </p>}
            <div className="schoolsCat">
            <h2>Secondary Schools</h2>
            {secondarySchools.length > 0 ? (
                <table>
                <tr>
                    <th>S/No.</th>
                    <th>Name</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
                {
                    secondarySchools.map((school, idx) => (
                        <tr>
                            <td>{idx + 1}</td>
                            <td>{school.schoolName}</td>
                            <td></td>
                            <td>
                                <span className="delete" onClick={() => dispatch(deleteSchoolStart(school.documentID))}>X</span>
                            </td>
                        </tr>
                    ))
                }
            </table>
            ): <p>There is no Secondary School listed</p>}
            </div>
        </div>
    );
}

export default SchoolsResults;