import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'



const firebaseConfig = {
    apiKey: "AIzaSyBRW3IJH0SJEO1mcrMGY8bfDH4i9qnK0Xw",
    authDomain: "shareddrive-b0a0f.firebaseapp.com",
    projectId: "shareddrive-b0a0f",
    storageBucket: "shareddrive-b0a0f.appspot.com",
    messagingSenderId: "712475795997",
    appId: "1:712475795997:web:13a71113aa4e19b4771cf4",
    measurementId: "G-NR3RSY54SM"
  };




// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);