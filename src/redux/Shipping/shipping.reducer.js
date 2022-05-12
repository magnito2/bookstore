import shippingTypes from "./shipping.types";

const INITIAL_STATE = {
    zones : [],
    address : {
        cost: 0,
        zone: '',
        name: '',
        addressID: ''
    }
}

const shippingReducer = ( state = INITIAL_STATE, action ) => {
    
    switch(action.type){
        case shippingTypes.SET_SHIPPING_ZONES:
            return {
                ...state,
                zones : [...action.payload]
            }

        case shippingTypes.SET_SHIPPING_ADDRESS:
            return {
                ...state,
                address: { ...action.payload }
            }

        default:
            return state;
    }
}

export default shippingReducer;