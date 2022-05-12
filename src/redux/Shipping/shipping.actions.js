import shippingTypes from "./shipping.types";

export const fetchShippingZonesStart = () => ({
    type : shippingTypes.FETCH_SHIPPING_ZONES_START
})

export const setShippingZones = shippingZones => ({
    type: shippingTypes.SET_SHIPPING_ZONES,
    payload: shippingZones
});

export const setShippingAddress = shippingAddress => ({
    type: shippingTypes.SET_SHIPPING_ADDRESS,
    payload: shippingAddress
});

export const updateShippingZoneStart = (zone) => ({
    type: shippingTypes.UPDATE_SHIPPING_ZONE_START,
    payload: zone
});
export const updateShippingZoneFinish = (zone) => ({
    type: shippingTypes.UPDATE_SHIPPING_ZONE_FINISH,
    payload: zone
});