import {all, call} from 'redux-saga/effects';

import userSagas from './User/user.sagas';
import productsSagas from './Products/products.sagas';
import schoolsSagas from './Schools/schools.saga';
import subjectsSagas from './Subjects/subjects.sagas';

export default function* rootSaga(){
    yield all([
        call(userSagas),
        call(productsSagas),
        call(schoolsSagas),
        call(subjectsSagas)
    ]);
}