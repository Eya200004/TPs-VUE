import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, serverTimestamp } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC40JqsBUWvO1a3l8rYGnrthdDo0qiFixQ",
  authDomain: "ensa-safi-voting-b876d.firebaseapp.com",
  projectId: "ensa-safi-voting-b876d",
  storageBucket: "ensa-safi-voting-b876d.firebasestorage.app",
  messagingSenderId: "247398442246",
  appId: "1:247398442246:web:39259330268efc180baa87",
  measurementId: "G-CX3DX4MZN6"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const timestamp = serverTimestamp;
