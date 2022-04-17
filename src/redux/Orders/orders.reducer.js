import ordersTypes from "./orders.types"

const INITIAL_STATE = {
    order: null,
    orders: [],
    isLastPage: false,
    queryDoc: null,
    showLoader: false,
}

const ordersReducer = ( state = INITIAL_STATE, action ) => {
    
    switch(action.type){

        case ordersTypes.SET_ORDERS:
            return {
                ...state,
                ...action.payload
            }
        case ordersTypes.SET_ORDER:
            return {
                ...state,
                order: action.payload,
                showLoader: false
            }
        case ordersTypes.PREPARE_ORDER_START:
            return {
                ...state,
                showLoader: true
            }

        default:
            return state;
    }
}

export default ordersReducer;