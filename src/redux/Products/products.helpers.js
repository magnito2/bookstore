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

export const handleFetchProducts = ({ filterType, filters = {}, startAfterDoc, persistProducts=[] }) => {
     
    return new Promise((resolve, reject) => {
        const pageSize = 12;
        let ref = collection(firestore, 'products');
        let q = query(ref, orderBy('createdDate'), limit(pageSize));
        
        if(filters instanceof Object && Object.keys(filters).length > 0){
            const { grade, year, subject, schoolID } = filters;
            if(grade) q = query(q, where('grade', '==', grade));
            if(year) q = query(q, where('year', '==', year));
            if(subject) q = query(q, where('subject', '==', subject));
            if(schoolID) { 
                const schoolRef = doc(firestore, 'schools', schoolID);
                q = query(q, where('schoolIDs', 'array-contains', schoolRef));
            }
        }

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

export const handleFilterProducts = (payload) => {
    console.log(`Filters are ${JSON.stringify(payload)}`);
    const { year, grade, schoolID } = payload;
    return new Promise((resolve, reject) => {
      const pageSize = 100;
      let ref = collection(firestore, "products");
      let q = query(ref, orderBy("createdDate"), limit(pageSize));
      const schoolRef = doc(firestore, "schools", schoolID);
      q = query(q, where("schoolIDs", "array-contains", schoolRef));

      getDocs(q)
        .then((snapshot) => {
          const data = [
            ...snapshot.docs.map((doc) => {
              return {
                ...doc.data(),
                documentID: doc.id,
              };
            }),
          ];

          const filteredProducts = data.filter(
            (product) => product.grade === grade && product.year === year
          );

          resolve({
            data: filteredProducts,
          });
        })
        .catch((err) => {
          reject(err);
        });
    });
}