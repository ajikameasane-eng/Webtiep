// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDU8SnS3KlYaC_Wft4mUPxfaoJknMy4Rtc ",
  authDomain: "weblightnovel-60a91.firebaseapp.com",
  databaseURL: "https://weblightnovel-60a91-default-rtdb.firebaseio.com",
  projectId: "weblightnovel-60a91",
  storageBucket: "weblightnovel-60a91.firebasestorage.app",
  messagingSenderId: "1044710751017",
  appId: "1:1044710751017:web:b6ac3e735223607e459538",
  measurementId: "G-L5991037F2"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getDatabase(app);
export const storage = getStorage(app);
export default app;
