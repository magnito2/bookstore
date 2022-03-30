import { takeLatest, put, all, call } from "redux-saga/effects";
import ordersTypes from "./orders.types";
import { handlePrepareOrder, handleUpdateOrder } from "./orders.helpers";

import { setPreparedOrder } from "./orders.actions";

export function* prepareOrder({payload}){
    try {
        const order = yield handlePrepareOrder(payload);

        yield put(
            setPreparedOrder(order)
        );
    } catch(err){
        console.log(`Error preparing order ${JSON.stringify(err)}`);
    }
}

export function* onPrepareOrderStart () {
    yield takeLatest(ordersTypes.PREPARE_ORDER_START, prepareOrder);
}

export function* updatePaymentStatus(params) {
    try {
        const order = yield handleUpdateOrder(params);
        
        yield put(
            setPreparedOrder(order)
        );
    } catch(err){
        console.log(`Error updating order ${err}`);
    }
}

export function* onUpdatePaymentStatusStart() {
    yield takeLatest(ordersTypes.UPDATE_PAYMENT_STATUS_START, updatePaymentStatus)
}

export default function* ordersSagas() {
    yield all([
        call(onPrepareOrderStart)
      ])
  }