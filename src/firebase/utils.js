import {initializeApp} from 'firebase/app';
import {getFirestore} from 'firebase/firestore/lite';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

import { firebaseConfig } from "./config";

const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const firestore = getFirestore(app);

const GoogleProvider = new GoogleAuthProvider();
GoogleProvider.setCustomParameters({ prompt: 'select_account' })
export const signInWithGoogle = () => signInWithPopup(auth, GoogleProvider);