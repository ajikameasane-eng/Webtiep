import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-app.js";
import { getDatabase, ref, push, set, get } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyDU8SnS3KlYaC_Wft4mUPxfaoJknMy4Rtc",
  authDomain: "weblightnovel-60a91.firebaseapp.com",
  databaseURL: "https://weblightnovel-60a91-default-rtdb.firebaseio.com",
  projectId: "weblightnovel-60a91",
  storageBucket: "weblightnovel-60a91.firebasestorage.app",
  messagingSenderId: "1044710751017",
  appId: "1:1044710751017:web:b6ac3e735223607e459538",
  measurementId: "G-L5991037F2"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
