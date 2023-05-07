// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAXr_UjA2TM7LJR4h-LvGe-Cu_RGIt2G-E",
  authDomain: "react-journal-app-rtk.firebaseapp.com",
  projectId: "react-journal-app-rtk",
  storageBucket: "react-journal-app-rtk.appspot.com",
  messagingSenderId: "637853169541",
  appId: "1:637853169541:web:db0c2023c901c0ab3736ec",
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(firebaseApp);
export const firebaseDB = getFirestore(firebaseApp);
