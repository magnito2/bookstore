import {initializeApp} from 'firebase/app';
import {getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider, onAuthStateChanged } from 'firebase/auth';

import { firebaseConfig } from "./config";

const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const firestore = getFirestore(app);

export const GoogleProvider = new GoogleAuthProvider();
GoogleProvider.setCustomParameters({ prompt: 'select_account' })

export const handleUserProfile = async ({ userAuth, additionalData }) => {
    if(!userAuth) return;

    const { uid } = userAuth;

    const userRef = doc(firestore, "users", uid);
    const snapshot = await getDoc(userRef);
    const userRoles = ['user'];

    if (!snapshot.exists()) {
        // create a new one
        console.log('snapshot does not exist, creating one')
        const { displayName, email } = userAuth;
        const timestamp = new Date();
        try{
            await setDoc(userRef, {
                displayName,
                email,
                timestamp,
                userRoles,
                ...additionalData
            });

        }catch(err){
            console.error(err);
        }
    }

    return userRef;
}

export const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
        const unsubscribe = onAuthStateChanged(auth, userAuth => {
            unsubscribe();
            resolve(userAuth)
        }, reject);
    });
}