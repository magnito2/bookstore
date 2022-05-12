import { takeLatest, put, all, call } from "redux-saga/effects";
import ordersTypes from "./orders.types";
import { handlePrepareOrder, handleUpdateOrder, handleFetchOrders, handleFetchOrder, handleCompleteOrder} from "./orders.helpers";

import { setOrders, setOrder, setError } from "./orders.actions";

export function* prepareOrder({payload}){
    try {
        const order = yield handlePrepareOrder(payload);

        yield put(
            setOrder(order)
        );
    } catch(err){
        console.log(`Error preparing order ${JSON.stringify(err)}`);
        yield put(
            setError(err)
        )
    }
}

export function* onPrepareOrderStart () {
    yield takeLatest(ordersTypes.PREPARE_ORDER_START, prepareOrder);
}

export function* updatePaymentStatus(params) {
    try {
        const order = yield handleUpdateOrder(params);
        
        yield put(
            setOrder(order)
        );
    } catch(err){
        console.log(`Error updating order ${err}`);
    }
}

export function* onUpdatePaymentStatusStart() {
    yield takeLatest(ordersTypes.UPDATE_PAYMENT_STATUS_START, updatePaymentStatus)
}

export function* fetchOrders() {
    try {
        const orders = yield handleFetchOrders();

        yield put(
            setOrders(orders)
        );
    } catch(err){
        console.log(err);
    }
}

export function* onFetchOrdersStart() {
    yield takeLatest(ordersTypes.FETCH_ORDERS_START, fetchOrders)
}

export function* fetchOrder({ payload }) {
    try {
        const order = yield handleFetchOrder(payload);

        yield put (
            setOrder(order)
        )
    } catch (err){
        console.log(err);
    }
}

export function* onFetchOrderStart() {
    yield takeLatest(ordersTypes.FETCH_ORDER_START, fetchOrder)
}

export function* completeOrder({ payload }){
    try {
        const order = yield handleCompleteOrder(payload);
        yield put(
            setOrder(order)
        )
    } catch (err){
        console.log(err);
    }
}

export function* onCompleteOrderStart() {
    yield takeLatest(ordersTypes.COMPLETE_ORDER_START, completeOrder)
}

export function* updateOrder({ payload }){
    try {
        const order = yield handleUpdateOrder(payload);
        yield put(
            setOrder(order)
        )
    } catch (err){
        console.log(err);
    }
}

export function* onUpdateOrderStart() {
    yield takeLatest(ordersTypes.UPDATE_ORDER_START, updateOrder)
}

export default function* ordersSagas() {
    yield all([
        call(onPrepareOrderStart),
        call(onUpdatePaymentStatusStart),
        call(onFetchOrdersStart),
        call(onFetchOrderStart),
        call(onCompleteOrderStart),
        call(onUpdateOrderStart)
      ])
  }