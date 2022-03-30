import {all, call} from 'redux-saga/effects';

import userSagas from './User/user.sagas';
import productsSagas from './Products/products.sagas';
import schoolsSagas from './Schools/schools.saga';
import subjectsSagas from './Subjects/subjects.sagas';
import shippingSagas from './Shipping/shipping.sagas';
import ordersSagas from './Orders/orders.sagas';

export default function* rootSaga(){
    yield all([
        call(userSagas),
        call(productsSagas),
        call(schoolsSagas),
        call(subjectsSagas),
        call(shippingSagas),
        call(ordersSagas)
    ]);
}