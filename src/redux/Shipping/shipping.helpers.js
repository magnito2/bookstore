import { collection, getDocs } from 'firebase/firestore';
import { firestore, prepareOrder } from '../../firebase/utils';

export const handleFetchShipping = () => {
    return new Promise((resolve, reject) => {
        let ref = collection(firestore, 'shipping_zones');
        
        getDocs(ref)
        .then(snapshot => {
            
            const data = [
                ...snapshot.docs.map(doc => {
                    let cost = ''
                    try {
                        cost = doc.data().delivery.pickup_station.small
                    } catch(err){
                        console.log(err);
                    }
                    return {
                        ...doc.data(),
                        cost,
                        documentID: doc.id
                    }
                })
            ];
            resolve([...data]);
        })
        .catch(err => {
            reject(err)
        })
    })
};