import { initializeApp } from "firebase/app";
import firebaseConfig from "config/firebase";
import { getFirestore } from 'firebase/firestore';

const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);

export default app;
