import ordersTypes from "./orders.types";

export const prepareOrderStart = orderParams => ({
    type: ordersTypes.PREPARE_ORDER_START,
    payload: orderParams
});

export const setPreparedOrder = order => ({
    type: ordersTypes.SET_PREPARED_ORDER,
    payload: order
});

export const confirmPaymentStart = params => ({
    type: ordersTypes.CONFIRM_PAYMENT_START,
    payload: params
});

export const updatePaymentStatusStart = params => ({
    type: ordersTypes.UPDATE_PAYMENT_STATUS_START,
    payload: params
});