// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDcJg65nPuZ_K7t6-ALwcC8dMNz_qnGZmo",
  authDomain: "auth-with-email-passwords.firebaseapp.com",
  projectId: "auth-with-email-passwords",
  storageBucket: "auth-with-email-passwords.firebasestorage.app",
  messagingSenderId: "529005656317",
  appId: "1:529005656317:web:1108793d96def1be7ae694"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);