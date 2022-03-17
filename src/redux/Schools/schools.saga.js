import { auth } from "../../firebase/utils";
import { takeLatest, put, all, call } from "redux-saga/effects";
import { setSchools, fetchSchoolsStart, setSchool, setSchoolProducts } from "./schools.actions";
import schoolsTypes from "./schools.types";
import { handleAddSchool, handleFetchSchools, handleFetchSchool, handleDeleteSchool, handleAddSchoolProduct, handleDeleteSchoolProduct, handleFetchSchoolProducts} from "./schools.helpers";

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

export function* addSchoolProduct({ payload }){
  try {
    const { schoolID, productID } = payload;
    yield handleAddSchoolProduct(schoolID, productID);
  }catch(err){
    console.log(err);
  }
}

export function* onAddSchoolProductStart(){
  yield takeLatest(schoolsTypes.ADD_SCHOOL_PRODUCT_START, addSchoolProduct)
}

export function* deleteSchoolProduct({ payload }){
  try {
    const { schoolID, productID } = payload;
    yield handleDeleteSchoolProduct(schoolID, productID);
  }catch(err){
    console.log(err);
  }
}

export function* onDeleteSchoolProductStart(){
  yield takeLatest(schoolsTypes.DELETE_SCHOOL_PRODUCT_START, deleteSchoolProduct)
}

export function* fetchSchoolProducts ({ payload }){
  try{
    const products = yield handleFetchSchoolProducts(payload);
    yield put(
      setSchoolProducts(products)
    )
  }catch(err){
    console.log(err);
  }
}

export function* onFetchSchoolProductsStart(){
  yield takeLatest(schoolsTypes.FETCH_SCHOOL_PRODUCTS_START, fetchSchoolProducts)
}

export default function* schoolsSagas() {
  yield all([
      call(onAddSchoolStart),
      call(onFetchSchoolsStart),
      call(onDeleteSchoolStart),
      call(onFetchSchoolStart),
      call(onAddSchoolProductStart),
      call(onDeleteSchoolProductStart),
      call(onFetchSchoolProductsStart)
    ])
}
