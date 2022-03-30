import shippingTypes from "./shipping.types";

export const fetchShippingStart = () => ({
    type : shippingTypes.FETCH_SHIPPING_START
})

export const setShipping = shipping => ({
    type: shippingTypes.SET_SHIPPING,
    payload: shipping
});

export const setShippingCost = shippingCost => ({
    type: shippingTypes.SET_SHIPPING_COST,
    payload: shippingCost
});