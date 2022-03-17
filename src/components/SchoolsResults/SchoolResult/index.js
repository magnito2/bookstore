import React from "react";
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import {ReactComponent as BooksIcon} from "../../../assets/books.svg";

const SchoolResult = ({
    school,
    idx,
    handleAddBooks,
    handleDeleteSchool
}) => {
  return (
    <tr>
      <td>{idx + 1}</td>
      <td>{school.schoolName}</td>
      <td>
      <FontAwesomeIcon icon={faEdit} />
      </td>
      <td>
        <span className="addBooks" onClick={() => handleAddBooks(school)}>
          <BooksIcon className="booksIcon" />
        </span>
      </td>
      <td>
        <span
          className="delete"
          onClick={() => handleDeleteSchool(school.documentID)}
        >
          <FontAwesomeIcon icon={faTrash} />
        </span>
      </td>
    </tr>
  );
};

export default SchoolResult;
