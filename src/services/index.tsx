// import { initializeApp } from "firebase/app";
import firebaseConfig from "config/firebase";
// import { getFirestore } from 'firebase/firestore';

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';
import 'firebase/compat/firestore';

// const app = initializeApp(firebaseConfig);
// export const firestore = getFirestore(app);

// export default app;

const app = firebase.initializeApp(firebaseConfig);

export default app;
export const firestore = app.firestore();
