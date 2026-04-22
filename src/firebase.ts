import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCdKhjzeQ3qMBIVBwo-ZZW9BVaTUSzPpj8",
  authDomain: "beverageshop-661d3.firebaseapp.com",
  projectId: "beverageshop-661d3",
  storageBucket: "beverageshop-661d3.firebasestorage.app",
  messagingSenderId: "484306503861",
  appId: "1:484306503861:web:312e0bdaa64c9b39e096fc",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };