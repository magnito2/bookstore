import ordersTypes from "./orders.types";

export const prepareOrderStart = orderParams => ({
    type: ordersTypes.PREPARE_ORDER_START,
    payload: orderParams
});

export const confirmPaymentStart = params => ({
    type: ordersTypes.CONFIRM_PAYMENT_START,
    payload: params
});

export const updatePaymentStatusStart = params => ({
    type: ordersTypes.UPDATE_PAYMENT_STATUS_START,
    payload: params
});

export const fetchOrdersStart = () => ({
    type: ordersTypes.FETCH_ORDERS_START
});

export const setOrders = orders => ({
    type: ordersTypes.SET_ORDERS,
    payload: orders
});

export const fetchOrderStart = orderID => ({
    type: ordersTypes.FETCH_ORDER_START,
    payload: orderID
});

export const setOrder = order => ({
    type: ordersTypes.SET_ORDER,
    payload: order
});

export const completeOrderStart = order => ({
    type: ordersTypes.COMPLETE_ORDER_START,
    payload: order
})