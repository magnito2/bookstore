import schoolsTypes from "./schools.types";

export const addSchoolStart = schoolData => ({
    type: schoolsTypes.ADD_NEW_SCHOOL_START,
    payload: schoolData
});

export const fetchSchoolsStart = (filters = {}) => ({
    type: schoolsTypes.FETCH_SCHOOLS_START,
    payload: filters
});

export const setSchools = schools => ({
    type: schoolsTypes.SET_SCHOOLS,
    payload: schools
});

export const deleteSchoolStart = schoolID => ({
    type: schoolsTypes.DELETE_SCHOOL_START,
    payload: schoolID
});

export const fetchSchoolStart = schoolID => ({
    type: schoolsTypes.FETCH_SCHOOL_START,
    payload: schoolID
});

export const setSchool = school => ({
    type: schoolsTypes.SET_SCHOOL,
    payload: school
});