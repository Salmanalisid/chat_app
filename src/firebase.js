// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyAYUO1wm3S902OZhmLuwlIH8Q7ZRpei6_g",
  authDomain: "new-chat-app-39e85.firebaseapp.com",
  projectId: "new-chat-app-39e85",
  storageBucket: "new-chat-app-39e85.appspot.com",
  messagingSenderId: "441206208142",
  appId: "1:441206208142:web:be4b4a56b0a61e14de7bdf",
  
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore(app);

// export const analytics = getAnalytics(app);