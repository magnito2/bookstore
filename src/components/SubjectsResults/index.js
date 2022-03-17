import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteSubjectStart, fetchSubjectsStart } from "../../redux/Subjects/subjects.actions";

import SubjectResult from "./SubjectResult";

import "./styles.scss";

const mapState = (state) => ({
  subjects: state.subjectsData.subjects.data,
});

const SubjectsResults = ({}) => {
  const { subjects } = useSelector(mapState);
  const dispatch = useDispatch();

  useEffect(() => {
      dispatch(
          fetchSubjectsStart()
      )
  }, []);

  const handleDeleteSubject = (subjectID) => {
    dispatch(deleteSubjectStart(subjectID))
  }

  const primarySubjects = subjects.filter(
    (subject) => subject.subjectLevel === "primary"
  );
  const secondarySubjects = subjects.filter(
    (subject) => subject.subjectLevel === "secondary"
  );

  return (
    <div className="wrap">
      <div className="schoolsCat">
        <h2>Primary School Subjects</h2>
        {primarySubjects.length > 0 ? (
          <table>
            <thead>
            <tr>
              <th>S/No.</th>
              <th>Name</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
            </thead>
            <tbody>
            {primarySubjects.map((subject, idx) => (
              <SubjectResult 
                subject={subject}
                idx={idx}
              />
            ))}
            </tbody>
          </table>
        ) : (
          <p>There is no Primary School Subjects listed </p>
        )}
      </div>
      <div className="schoolsCat">
        <h2>Secondary School Subjects</h2>
        {secondarySubjects.length > 0 ? (
          <table>
            <thead>
            <tr>
              <th>S/No.</th>
              <th>Name</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
            </thead>
            <tbody>
            {secondarySubjects.map((subject, idx) => (
              <SubjectResult 
                subject={subject}
                idx={idx}
              />
        ))}
            </tbody>
          </table>
        ) : (
          <p>There is no Secondary School Subjects listed</p>
        )}
      </div>
    </div>
  );
};

export default SubjectsResults;
