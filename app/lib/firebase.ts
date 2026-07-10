import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBys_zJJJFU3cDtj2iiqqhIHvwfPpg1kS0",
  authDomain: "gymcall.firebaseapp.com",
  projectId: "gymcall",
  storageBucket: "gymcall.firebasestorage.app",
  messagingSenderId: "793593234109",
  appId: "1:793593234109:web:ce51525b2f3852deda2dd4",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);