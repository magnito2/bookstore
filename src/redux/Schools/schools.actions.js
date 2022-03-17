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

export const addSchoolProductStart = (schoolID, productID) => ({
    type: schoolsTypes.ADD_SCHOOL_PRODUCT_START,
    payload: { schoolID, productID }
});

export const deleteSchoolProductStart = (schoolID, productID) => ({
    type: schoolsTypes.DELETE_SCHOOL_PRODUCT_START,
    payload: { schoolID, productID }
});

export const fetchSchoolProductsStart = (schoolID) => ({
    type: schoolsTypes.FETCH_SCHOOL_PRODUCTS_START,
    payload: schoolID
});

export const setSchoolProducts = (products) => ({
    type: schoolsTypes.SET_SCHOOL_PRODUCTS,
    payload: products
});