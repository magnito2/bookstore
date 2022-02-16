import subjectsTypes from "./subjects.types";

export const addSubjectStart = subjectData => ({
    type: subjectsTypes.ADD_NEW_SUBJECT_START,
    payload: subjectData
});

export const fetchSubjectsStart = (filters = {}) => ({
    type: subjectsTypes.FETCH_SUBJECTS_START,
    payload: filters
});

export const setSubjects = subjects => ({
    type: subjectsTypes.SET_SUBJECTS,
    payload: subjects
});

export const deleteSubjectStart = subjectID => ({
    type: subjectsTypes.DELETE_SUBJECT_START,
    payload: subjectID
});

export const fetchSubjectStart = subjectID => ({
    type: subjectsTypes.FETCH_SUBJECT_START,
    payload: subjectID
});

export const setSubject = subject => ({
    type: subjectsTypes.SET_SUBJECT,
    payload: subject
});