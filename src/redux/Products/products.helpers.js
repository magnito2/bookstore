import { collection, doc, addDoc, getDocs, deleteDoc } from 'firebase/firestore';
import { firestore } from '../../firebase/utils';

export const handleAddProduct = product => {
    return new Promise((resolve, reject) => {
        addDoc(collection(firestore, 'products'), product)
        .then(() => {
            resolve();
        })
        .catch(err => {
            reject(err);
        })
    })
}

export const handleFetchProduct = () => {
    return new Promise((resolve, reject) => {
        // firestore
        // .collection('products')
        // .get()
        
        getDocs(collection(firestore, 'products'))
        .then(snapshot => {
            const productArray = snapshot.docs.map(doc => {
                return {
                    ...doc.data(),
                    documentID: doc.id
                }
            });
            resolve(productArray);
        })
        .catch(err => {
            reject(err)
        })
    })
}

export const handleDeleteProduct = documentID => {
    console.log('we are here', documentID);

    return new Promise((resolve, reject) => {
        // firestore
        // .collection('products')
        // .doc(documentID)
        // .delete()
        

        deleteDoc(doc(firestore, 'products', documentID))
        .then(() => {
            resolve();
        }).catch(err => {
            reject(err);
        })
    });
}