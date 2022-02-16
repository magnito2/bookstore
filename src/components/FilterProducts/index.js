import React, { useState, useEffect } from "react";
import { MultilevelMenu } from "react-multilevel-menu";
import { useDispatch } from 'react-redux';
import { fetchProductsStart } from "../../redux/Products/products.actions";

import './styles.scss';

const FilterProducts = ({}) => {

    const [stage, setStage] = useState('');
    const [grade, setGrade] = useState('');
    const dispatch = useDispatch();

    const selectedItem = (event) => {
        dispatch(
            fetchProductsStart({filters: { ...event, items: [] }})
        )
      }

    const config = {
        paddingAtStart: true,
        classname: 'multiLevelMenu',
        listBackgroundColor: `#ffd166`,
        fontColor: `rgb(8, 54, 71)`,
        backgroundColor: `#ef476f`,
        selectedListFontColor: `#ef476f`,
        highlightOnSelect: true,
        useDividers: true,
    };

    const primarySchoolSubjects = [
      "English",
      "Mathematics",
      "Kiswahili",
      "CRE",
      "Social Studies",
      "Science",
    ];

    const secondarySchoolSubjects = [
      "English",
      "Mathematics",
      "Biology",
      "Chemistry",
      "Agriculture",
      "Computer Science",
      "Business Studies",
      "CRE",
      "History",
      "Geography",
      "Physics",
    ];

    const filterList = [
        {
            label: 'All Books',
            value: ''
        },
        {
            label: 'Primary',
            value: 'primary',
            grade: 'primary',
            items: [...[...Array(8).keys()].map(key => ({
                label: `Class ${key + 1}`,
                grade: `primary`,
                year: key + 1,
                value: `primary_class_${key + 1}`,
                items: [...primarySchoolSubjects.map(subject => ({ 
                    label: subject,
                    grade: `primary`,
                    year: key + 1,
                    subject,
                    value: `primary_class_${key + 1}_${subject}`
                }))]
            }))]
        },
        {
            label: 'Secondary',
            value: 'secondary',
            grade: 'secondary',
            items: [...[...Array(4).keys()].map(key => ({
                label: `Form ${key + 1}`,
                grade: 'secondary',
                year: key + 1,
                value: `secondary_form_${key + 1}`,
                items: [...secondarySchoolSubjects.map(subject => ({ 
                    label: subject,
                    grade: 'secondary',
                    year: key + 1,
                    subject,
                    value: `secondary_form_${key + 1}_${subject}`
                }))]
            }))]
        },
        {
            label: 'E C D',
            grade: 'ecd',
            value: 'ecd'
        }
    ];

    return (
        <div className="filterProducts">
            <h3>Filter Books</h3>
            <MultilevelMenu 
                list={ filterList }
                configuration={ config }
                selectedListItem={ selectedItem }
                selectedLabel={ selectedItem }
            />
        </div>
    );
}

export default FilterProducts;