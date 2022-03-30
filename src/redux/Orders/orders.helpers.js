import { collection, getDocs } from 'firebase/firestore';
import { firestore, prepareOrder } from '../../firebase/utils';

export const handlePrepareOrder = (orderParams) => {
    return new Promise((resolve, reject) => {
        prepareOrder({...orderParams})
        .then((result) => {
            resolve(result.data)
        })
        .catch(err => {
            reject(err);
        })
    });
}

export const handleUpdateOrder = (params) => {
    return new Promise((resolve, reject) => {
        
    })
}