// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyCXV8zlxz5huP_cyMJqk_lTAJMVA-8GWys",
  authDomain: "vendor-410209.firebaseapp.com",
  projectId: "vendor-410209",
  storageBucket: "vendor-410209.appspot.com",
  messagingSenderId: "234851416574",
  appId: "1:234851416574:web:695bfb80a1585bf71a28af",
  measurementId: "G-Q4JTWN1VND"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const provider = new GoogleAuthProvider()
export {auth, provider}
