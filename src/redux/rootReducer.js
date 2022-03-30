import {combineReducers} from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import userReducer from './User/user.reducer';
import productsReducer from './Products/products.reducer';
import cartReducer from './Cart/cart.reducer';
import schoolsReducer from './Schools/schools.reducer';
import subjectsReducer from './Subjects/subjects.reducer';
import shippingReducer from './Shipping/shipping.reducer';
import ordersReducer from './Orders/orders.reducer';

export const rootReducer = combineReducers({
    user: userReducer,
    productsData: productsReducer,
    cartData: cartReducer,
    schoolsData: schoolsReducer,
    subjectsData: subjectsReducer,
    shippingData: shippingReducer,
    ordersData: ordersReducer,
});

const configStorage = {
    key: 'root',
    storage,
    whitelist: ['cartData']
};

export default persistReducer(configStorage, rootReducer);