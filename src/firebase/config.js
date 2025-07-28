import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBNKslnVeoCKTS3ZMBVD4F89FlmtkLfkTU",
    authDomain: "ecommerce-5e666.firebaseapp.com",
    projectId: "ecommerce-5e666",
    storageBucket: "ecommerce-5e666.firebasestorage.app",
    messagingSenderId: "107700779960",
    appId: "1:107700779960:web:829e139aa74ece97126d4d",
    measurementId: "G-GDML1LRN24"
};

const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_DB = getFirestore(FIREBASE_APP);