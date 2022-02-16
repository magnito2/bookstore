import productsTypes from "./products.types";

const INITIAL_STATE ={
    products: [], 
    product: {},
    isLoading: false
}
const productsReducer = ( state= INITIAL_STATE, action) => {
    switch (action.type) {
        case productsTypes.FETCH_PRODUCTS_START:
            return {
                ...state,
                isLoading: true
            }
        case productsTypes.SET_PRODUCTS:
            return {
                ...state,
                products: action.payload,
                isLoading: false
            }
        case productsTypes.SET_PRODUCT:
            return {
                ...state,
                product: action.payload
            }
        default:
            return state;
    }
};

export default productsReducer;