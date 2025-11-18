// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth}  from 'firebase/auth';  // Add typing for Auth
import { getFirestore, Firestore } from 'firebase/firestore';  // Add typing for Firestore
import { getStorage } from 'firebase/storage';  // Add typing for Storage

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCWkNsOvTFzkCGdfBzke5iiWMbvDXHEqek',
  authDomain: 'driftergram-431d0.firebaseapp.com',
  projectId: 'driftergram-431d0',
  storageBucket: 'driftergram-431d0.firebasestorage.app',
  messagingSenderId: '434353782950',
  appId: '1:434353782950:web:9e60fc2b9c1047cb0bf467',
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);


export {app, auth, firestore, storage};