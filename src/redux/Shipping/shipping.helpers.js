import { collection, getDocs, doc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { firestore, } from '../../firebase/utils';
import { mergeDeep} from '../../Utils';

export const handleFetchShippingZones = () => {

    return new Promise((resolve, reject) => {
        let ref = collection(firestore, 'shipping_zones');
        
        getDocs(ref)
        .then(snapshot => {
            
            const data = [
                ...snapshot.docs.map(doc => {
                    const defaultZone = {
                        towns: [],
                        delivery: {
                            door: {
                                small: null,
                                medium: null,
                                large: null
                            },
                            pickup_station: {
                                small: null,
                                medium: null,
                                large: null
                            }
                        }
                    };
                    const merged = mergeDeep(defaultZone, {...doc.data()})
                    return {
                        ...merged,
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

export const handleUpdateShippingZone = zone => {
    return new Promise((resolve, reject) => {
        const zoneRef = doc(firestore, 'shipping_zones', zone.documentID);
        updateDoc(zoneRef, {
            [zone.field]: zone.isArray ? (zone.removeValue ? arrayRemove(zone.value) : arrayUnion(zone.value)) : zone.value
        })
        .then(resp => {
            resolve(resp);
        })
        .catch(err => {
            reject(err)
        });
    })
}