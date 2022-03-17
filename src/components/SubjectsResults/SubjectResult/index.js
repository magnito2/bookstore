import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";

const SubjectResult = ({ idx, subject, handleDeleteSubject }) => {
  return (
    <tr>
      <td>{idx + 1}</td>
      <td>{subject.subjectName}</td>
      <td>
        <FontAwesomeIcon icon={faEdit} />
      </td>
      <td>
        <span
          className="delete"
          onClick={() => handleDeleteSubject(subject.documentID)}
        >
          <FontAwesomeIcon icon={faTrash} />
        </span>
      </td>
    </tr>
  );
};

export default SubjectResult;
