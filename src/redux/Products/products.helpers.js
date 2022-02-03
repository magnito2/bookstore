import { collection, doc, addDoc, getDoc, getDocs, deleteDoc, orderBy, query, where, limit, startAfter } from 'firebase/firestore';
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

export const handleFetchProducts = ({ filterType, startAfterDoc, persistProducts=[] }) => {
    return new Promise((resolve, reject) => {
        const pageSize = 6;
        let ref = collection(firestore, 'products');
        let q = query(ref, orderBy('createdDate'), limit(pageSize));
        if(filterType) q = query(q, where('productCategory', '==', filterType));
        if(startAfterDoc) q = query(q, startAfter(startAfterDoc)); 
        getDocs(q)
        .then(snapshot => {
            const totalCount = snapshot.size;

            const data = [
                ...persistProducts,
                ...snapshot.docs.map(doc => {
                    return {
                        ...doc.data(),
                        documentID: doc.id
                    }
                })
            ];
            resolve({
                data,
                queryDoc: snapshot.docs[totalCount -1],
                isLastPage: totalCount < 1
            });
        })
        .catch(err => {
            reject(err)
        })
    })
}

export const handleDeleteProduct = documentID => {
    
    return new Promise((resolve, reject) => {
       
        deleteDoc(doc(firestore, 'products', documentID))
        .then(() => {
            resolve();
        }).catch(err => {
            reject(err);
        })
    });
}

export const handleFetchProduct = (productID) => {
    console.log('We actually got here');
    return new Promise((resolve, reject) => {
        const docRef = doc(firestore, 'products', productID);
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