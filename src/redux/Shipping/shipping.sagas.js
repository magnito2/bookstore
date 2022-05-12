import { takeLatest, put, all, call } from "redux-saga/effects";
import shippingTypes from "./shipping.types";
import { handleFetchShippingZones, handleUpdateShippingZone } from "./shipping.helpers";
import { setShippingZones, updateShippingZoneFinish } from "./shipping.actions";

export function* fetchShippingZones(){
    try {
        const shipping = yield handleFetchShippingZones();
        
        yield put(
            setShippingZones(shipping)
        )
    } catch(err){
        console.log(err);
    }
}

export function* onFetchShippingZonesStart () {
    yield takeLatest(shippingTypes.FETCH_SHIPPING_ZONES_START, fetchShippingZones);
}

export function* updateShippingZone({ payload }) {
    try {
        const resp = yield handleUpdateShippingZone(payload);

        yield put(
            updateShippingZoneFinish(resp)
        )
    } catch(err){
        console.log(err);
    }
}

export function* onUpdateShippingZoneStart () {
    yield takeLatest(shippingTypes.UPDATE_SHIPPING_ZONE_START, updateShippingZone);
}

export default function* shippingSagas() {
    yield all([
        call(onFetchShippingZonesStart),
        call(onUpdateShippingZoneStart)
      ])
  }