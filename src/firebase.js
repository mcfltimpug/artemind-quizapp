// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAQgg2jwTUJgxw-Wltvos6ciS-cpLD2_Ak",
  authDomain: "artemindfb.firebaseapp.com",
  projectId: "artemindfb",
  storageBucket: "artemindfb.appspot.com",
  messagingSenderId: "899994657700",
  appId: "1:899994657700:web:e1f60b0fac23ec30189731",
  measurementId: "G-09YEG9MKZK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export default db;