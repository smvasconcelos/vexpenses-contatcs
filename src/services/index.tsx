import { initializeApp } from "firebase/app";
import firebaseConfig from "config/firebase";
import { getFirestore } from 'firebase/firestore/lite';

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export default app;
