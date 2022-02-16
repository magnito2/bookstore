import { auth } from "../../firebase/utils";
import { takeLatest, put, all, call } from "redux-saga/effects";
import { setSubjects, fetchSubjectsStart, setSubject } from "./subjects.actions";
import subjectsTypes from "./subjects.types";
import { handleAddSubject, handleFetchSubjects, handleFetchSubject, handleDeleteSubject } from "./subjects.helpers";

export function* addSubject({ payload }) {
  try {
    const timestamp = new Date();
    yield handleAddSubject({
      ...payload,
      subjectAdminUserUID: auth.currentUser.uid,
      createdDate: timestamp,
    });
    yield put(
        fetchSubjectsStart()
    )
  } catch (err) {
    //console.log(err)
  }
}

export function* onAddSubjectStart() {
  yield takeLatest(subjectsTypes.ADD_NEW_SUBJECT_START, addSubject);
}

export function* fetchSubjects({ payload }){
    try{
        const subjects = yield handleFetchSubjects(payload );
        yield put(
            setSubjects(subjects)
        )
    }catch(err){
      console.log(err);
    }
}

export function* onFetchSubjectsStart(){
    yield takeLatest(subjectsTypes.FETCH_SUBJECTS_START, fetchSubjects);
}

export function* deleteSubject({ payload }){
    try {
        yield handleDeleteSubject(payload);
        yield put(
            fetchSubjectsStart()
        );
    } catch(err){
     // console.log(err)
    }
}

export function* onDeleteSubjectStart(){
    yield takeLatest(subjectsTypes.DELETE_SUBJECT_START, deleteSubject)
}

export function* fetchSubject({ payload }){
  try{
    const subject = yield handleFetchSubject(payload);
    yield put(
      setSubject(subject)
    )
  }catch(err){
    console.log(err);
  }
}

export function* onFetchSubjectStart(){
  yield takeLatest(subjectsTypes.FETCH_SUBJECT_START, fetchSubject)
}

export default function* subjectsSagas() {
  yield all([
      call(onAddSubjectStart),
      call(onFetchSubjectsStart),
      call(onDeleteSubjectStart),
      call(onFetchSubjectStart)
    ])
}
