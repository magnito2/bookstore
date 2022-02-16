import schoolsTypes from './schools.types';

const INITIAL_STATE ={
    schools: {
        data: []
    }, 
    school: {}
}
const schoolsReducer = ( state= INITIAL_STATE, action) => {
    switch (action.type) {
        case schoolsTypes.SET_SCHOOLS:
            return {
                ...state,
                schools: action.payload
            }
        case schoolsTypes.SET_SCHOOL:
            return {
                ...state,
                school: action.payload
            }
        default:
            return state;
    }
};

export default schoolsReducer;