import ordersTypes from "./orders.types"

const INITIAL_STATE = {
    order: null
}

const ordersReducer = ( state = INITIAL_STATE, action ) => {
    
    switch(action.type){

        case ordersTypes.SET_PREPARED_ORDER:
            return {
                ...state,
                order: action.payload
            }

        default:
            return state;
    }
}

export default ordersReducer;