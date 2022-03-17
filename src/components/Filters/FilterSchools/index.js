import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSchoolsStart } from "../../../redux/Schools/schools.actions";
import { fetchProductsStart } from "../../../redux/Products/products.actions";

import ListYear from "./ListYear";

import './styles.scss';

const mapState = ({ schoolsData }) => ({
    schools: schoolsData.schools.data
})
const FilterSchools = ({}) => {
    const dispatch = useDispatch();
    const { schools } = useSelector(mapState);
    const [clicked, setClicked] = useState('');

    const toggleClicked = (schoolID) => {
        clicked === schoolID ? setClicked('') : setClicked(schoolID);
    }

    useEffect(() => {
        dispatch(
          fetchSchoolsStart()
        );
    }, []);

    useEffect(() => {
      clicked ? (
        dispatch(
          fetchProductsStart(
              {
                filters: 
                  {
                    schoolID: clicked,
                  },
              }
            )
          )
      ) : (
        dispatch(
          fetchProductsStart()
        )
      );
    }, [clicked]);

    return (
        <div className="filterSchools">
            <ul className="schoolList">
                {
                    schools.map((school,idx) => {
                        return (
                          <li className="schoolItem"
                            key={idx}
                            onClick={() => {
                              toggleClicked(school.documentID);
                            }}
                          >
                            {school.schoolName}
                            <ul className="years">
                              {clicked === school.documentID &&
                              school.grade &&
                              school.grade === "primary"
                                ? [...Array(8).keys()].map((key, idx) => (
                                    <ListYear key ={key} grade={school.grade} year={key + 1} schoolID={school.documentID} />
                                  ))
                                : null}
                              {clicked === school.documentID &&
                              school.grade &&
                              school.grade === "secondary"
                                ? [...Array(4).keys()].map((key, idx) => (
                                    <ListYear key ={key} grade={school.grade} year={key + 1} schoolID={school.documentID} />
                                  ))
                                : null}
                            </ul>
                          </li>
                        );
                    })
                }
            </ul>
        </div>
    );
}

export default FilterSchools;