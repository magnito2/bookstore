import shippingTypes from "./shipping.types";

const INITIAL_STATE = {
    zones : [],
    cost : 0
}

const shippingReducer = ( state = INITIAL_STATE, action ) => {
    
    switch(action.type){
        case shippingTypes.SET_SHIPPING:
            return {
                ...state,
                zones : [...action.payload]
            }

        case shippingTypes.SET_SHIPPING_COST:
            return {
                ...state,
                cost: action.payload
            }

        default:
            return state;
    }
}

export default shippingReducer;