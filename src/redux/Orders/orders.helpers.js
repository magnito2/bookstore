import { collection, doc, getDoc, getDocs, updateDoc } from 'firebase/firestore';
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
        const { id } = params;
        const docRef = doc(firestore, 'orders', id);
        getDoc(docRef)
        .then(snapshot => {
            if(snapshot.exists()){
                updateDoc(docRef, {...params}).then(() => {
                    getDoc(docRef)
                    .then(snapshot => {
                        resolve({
                            ...snapshot.data(),
                            documentID: snapshot.id
                        })
                    })
                })
            } else {
                throw new Error(`Order of id ${id} not found`);
            }
        }).catch(err => {
            reject(err)
        })
    })
}

export const handleFetchOrders = () => {
    return new Promise((resolve, reject) => {
        const pageSize = 12;
        let ref = collection(firestore, 'orders');
        
        getDocs(ref)
        .then(snapshot => {
            const totalCount = snapshot.size;
            const data = [
                ...snapshot.docs.map(doc => {
                    return {
                        ...doc.data(),
                        documentID: doc.id
                    }
                })
            ];
            resolve({
                orders: data,
                queryDoc: snapshot.docs[totalCount -1],
                isLastPage: totalCount < 1
            });
        })
        .catch(err => {
            reject(err)
        })
    })
}

export const handleFetchOrder = orderID => {
    return new Promise((resolve, reject) => {
        const docRef = doc(firestore, 'orders', orderID);
        getDoc(docRef)
        .then(snapshot => {
            if(snapshot.exists()){
                resolve({
                    ...snapshot.data(),
                    documentID: snapshot.id
                });
            }
        })
        .catch(err => {
            reject(err);
        });
    })
}

export const handleCompleteOrder = order => {
    return new Promise((resolve, reject) => {
        const { id, status, mc } = order;
        if(status === 'aei7p7yrx4ae34'){
            const docRef = doc(firestore, 'orders', id);
            getDoc(docRef)
            .then(snapshot => {
                if(snapshot.exists()){
                    const data = snapshot.data();
                    if(data.total !== +mc){
                        reject('Amount Less than invoice')
                    }
                    updateDoc(docRef, {
                        status: 'Pending'
                    }).then(() => {
                        resolve({
                            ...data,
                            documentID: snapshot.id,
                            status: 'Success'
                        })
                    })
                }
                else {
                    reject('There was an error completing the order, we are looking into it, feel free to reach out to us');
                }
            })
        }
        const docRef = doc(firestore, 'orders', id);
        
    })
}