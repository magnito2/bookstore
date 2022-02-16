import { collection, doc, addDoc, getDoc, getDocs, deleteDoc, orderBy, query, where, limit, startAfter } from 'firebase/firestore';
import { firestore } from '../../firebase/utils';

export const handleAddSchool = school => {
    return new Promise((resolve, reject) => {
        addDoc(collection(firestore, 'schools'), school)
        .then(() => {
            resolve();
        })
        .catch(err => {
            reject(err);
        })
    })
}

export const handleFetchSchools = ({ filterType, startAfterDoc, persistSchools=[] }) => {
    return new Promise((resolve, reject) => {
        const pageSize = 50;
        let ref = collection(firestore, 'schools');
        let q = query(ref, orderBy('createdDate'), limit(pageSize));
        if(filterType) q = query(q, where('schoolCategory', '==', filterType));
        if(startAfterDoc) q = query(q, startAfter(startAfterDoc)); 
        getDocs(q)
        .then(snapshot => {
            const totalCount = snapshot.size;

            const data = [
                ...persistSchools,
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

export const handleDeleteSchool = documentID => {
    
    return new Promise((resolve, reject) => {
       
        deleteDoc(doc(firestore, 'schools', documentID))
        .then(() => {
            resolve();
        }).catch(err => {
            reject(err);
        })
    });
}

export const handleFetchSchool = (schoolID) => {
    
    return new Promise((resolve, reject) => {
        const docRef = doc(firestore, 'schools', schoolID);
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