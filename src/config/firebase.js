// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore/lite";
import { getStorage } from 'firebase/storage';
import {getAuth} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBfg1tUTudjAgL8AMNCppqiaf8JHgufIB8",
  authDomain: "mylibrary-30038.firebaseapp.com",
  projectId: "mylibrary-30038",
  storageBucket: "mylibrary-30038.appspot.com",
  messagingSenderId: "121146691770",
  appId: "1:121146691770:web:66efcbdce1227f5897b283",
  measurementId: "G-N10NRB8K5Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const firestore = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app)
export {firestore , storage,auth}