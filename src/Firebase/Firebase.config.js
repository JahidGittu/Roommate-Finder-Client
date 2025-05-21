// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "***REMOVED***",
  authDomain: "roommate-finder-pro.firebaseapp.com",
  projectId: "roommate-finder-pro",
  storageBucket: "roommate-finder-pro.firebasestorage.app",
  messagingSenderId: "1025848159914",
  appId: "1:1025848159914:web:4405535f55ec44a72eaad3"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);