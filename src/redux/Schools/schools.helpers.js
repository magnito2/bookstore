import { collection, doc, addDoc, setDoc, getDoc, getDocs, deleteDoc, orderBy, query, where, limit, startAfter } from 'firebase/firestore';
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
    });
}

export const handleFetchSchoolProducts = (schoolID) => {
    return new Promise((resolve, reject) => {
        console.log(`Our school id is ${schoolID}`);
        const junctionRefs = collection(firestore, 'junction_school_product');
        let q = query(junctionRefs, where('schoolID', '==', schoolID));
        getDocs(q)
        .then(async snapshot => {
            console.log(`we actually got here, length is ${snapshot.size}`);
            /*return [...snapshot.docs
            .filter(doc => doc.exists())
            .map(docu => getDoc(doc(firestore, 'products', docu.data().productID)))];*/

            const filteredDocs = snapshot.docs.filter(doc => doc.exists());
            
            const schoolProducts = await Promise.all(filteredDocs.map(async (docu) => await getDoc(doc(firestore, 'products', docu.data().productID))))
            console.log(`School products are ${schoolProducts}`);
            return  schoolProducts;
        })
        .then(products => {
            resolve(
                products.filter(product => product.exists).map(product =>({
                id: product.id,
                ...product.data()
            })
            ))
        })
        .catch(err => {
            reject(err);
        })
    })
}

export const handleAddSchoolProduct = (schoolID, productID) => {
    return new Promise((resolve, reject) => {
        setDoc(doc(firestore, 'junction_school_product', `${schoolID}_${productID}`), {schoolID, productID})
        .then(resolve())
        .catch(err => reject(err));
    })
}

export const handleDeleteSchoolProduct = (schoolID, productID) => {
    return new Promise((resolve, reject) => {
        deleteDoc(doc(firestore, 'junction_school_product', `${schoolID}_${productID}`))
        .then(resolve())
        .catch(err => reject(err));
    })
}