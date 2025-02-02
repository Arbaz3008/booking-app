import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyC8bIzl0c0ao4Qlk3J-vVH-oIh7ytw7M44",
  authDomain: "bookmee-3.firebaseapp.com",
  projectId: "bookmee-3",
  storageBucket: "bookmee-3.firebasestorage.app",
  messagingSenderId: "160557034579",
  appId: "1:160557034579:web:bac1064652200d4da56aa6",
  measurementId: "G-V7JLVGCNSM"
};

const app = initializeApp(firebaseConfig);
const auth= getAuth(app);
const db = getFirestore();
export{auth,db}