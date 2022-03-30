import { takeLatest, put, all, call } from "redux-saga/effects";
import shippingTypes from "./shipping.types";
import { handleFetchShipping } from "./shipping.helpers";
import { setShipping } from "./shipping.actions";

export function* fetchShipping(){
    try {
        const shipping = yield handleFetchShipping();
        
        yield put(
            setShipping(shipping)
        )
    } catch(err){
        console.log(err);
    }
}

export function* onFetchShippingStart () {
    yield takeLatest(shippingTypes.FETCH_SHIPPING_START, fetchShipping);
}

export default function* shippingSagas() {
    yield all([
        call(onFetchShippingStart)
      ])
  }