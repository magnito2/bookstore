import { auth } from "../../firebase/utils";
import { takeLatest, put, all, call } from "redux-saga/effects";
import { setSchools, fetchSchoolsStart, setSchool } from "./schools.actions";
import schoolsTypes from "./schools.types";
import { handleAddSchool, handleFetchSchools, handleFetchSchool, handleDeleteSchool } from "./schools.helpers";

export function* addSchool({ payload }) {
  try {
    const timestamp = new Date();
    yield handleAddSchool({
      ...payload,
      schoolAdminUserUID: auth.currentUser.uid,
      createdDate: timestamp,
    });
    yield put(
        fetchSchoolsStart()
    )
  } catch (err) {
    //console.log(err)
  }
}

export function* onAddSchoolStart() {
  yield takeLatest(schoolsTypes.ADD_NEW_SCHOOL_START, addSchool);
}

export function* fetchSchools({ payload }){
    try{
        const schools = yield handleFetchSchools(payload );
        yield put(
            setSchools(schools)
        )
    }catch(err){
      console.log(err);
    }
}

export function* onFetchSchoolsStart(){
    yield takeLatest(schoolsTypes.FETCH_SCHOOLS_START, fetchSchools);
}

export function* deleteSchool({ payload }){
    try {
        yield handleDeleteSchool(payload);
        yield put(
            fetchSchoolsStart()
        );
    } catch(err){
     // console.log(err)
    }
}

export function* onDeleteSchoolStart(){
    yield takeLatest(schoolsTypes.DELETE_SCHOOL_START, deleteSchool)
}

export function* fetchSchool({ payload }){
  try{
    const school = yield handleFetchSchool(payload);
    yield put(
      setSchool(school)
    )
  }catch(err){
    console.log(err);
  }
}

export function* onFetchSchoolStart(){
  yield takeLatest(schoolsTypes.FETCH_SCHOOL_START, fetchSchool)
}

export default function* schoolsSagas() {
  yield all([
      call(onAddSchoolStart),
      call(onFetchSchoolsStart),
      call(onDeleteSchoolStart),
      call(onFetchSchoolStart)
    ])
}
