import { collection, doc, addDoc, getDoc, getDocs, deleteDoc, orderBy, query, where, limit, startAfter } from 'firebase/firestore';
import { firestore } from '../../firebase/utils';

export const handleAddSubject = subject => {
    return new Promise((resolve, reject) => {
        addDoc(collection(firestore, 'subjects'), subject)
        .then(() => {
            resolve();
        })
        .catch(err => {
            reject(err);
        })
    })
}

export const handleFetchSubjects = ({ filterType, startAfterDoc, persistSUBJECTs=[] }) => {
    return new Promise((resolve, reject) => {
        const pageSize = 50;
        let ref = collection(firestore, 'subjects');
        let q = query(ref, orderBy('createdDate'), limit(pageSize));
        if(filterType) q = query(q, where('subjectCategory', '==', filterType));
        if(startAfterDoc) q = query(q, startAfter(startAfterDoc)); 
        getDocs(q)
        .then(snapshot => {
            const totalCount = snapshot.size;

            const data = [
                ...persistSUBJECTs,
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

export const handleDeleteSubject = documentID => {
    
    return new Promise((resolve, reject) => {
       
        deleteDoc(doc(firestore, 'subjects', documentID))
        .then(() => {
            resolve();
        }).catch(err => {
            reject(err);
        })
    });
}

export const handleFetchSubject = (subjectID) => {
    
    return new Promise((resolve, reject) => {
        const docRef = doc(firestore, 'subjects', subjectID);
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