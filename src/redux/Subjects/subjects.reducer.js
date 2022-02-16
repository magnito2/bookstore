import subjectsTypes from './subjects.types';

const INITIAL_STATE ={
    subjects: {
        data: []
    }, 
    subject: {}
}
const subjectsReducer = ( state= INITIAL_STATE, action) => {
    switch (action.type) {
        case subjectsTypes.SET_SUBJECTS:
            return {
                ...state,
                subjects: action.payload
            }
        case subjectsTypes.SET_SUBJECT:
            return {
                ...state,
                subject: action.payload
            }
        default:
            return state;
    }
};

export default subjectsReducer;