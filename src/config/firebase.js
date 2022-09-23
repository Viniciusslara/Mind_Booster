// Import the functions you need from the SDKs you need
import firebase from "firebase/app";
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAP4XIc9SSuCDJBouVoy8zP_B4JWe_CEIE",
  authDomain: "mindbooster-c7f3a.firebaseapp.com",
  projectId: "mindbooster-c7f3a",
  storageBucket: "mindbooster-c7f3a.appspot.com",
  messagingSenderId: "641884367699",
  appId: "1:641884367699:web:91136c413e7e0e318d0fa6"
};

// Initialize Firebase
export default firebase.initializeApp(firebaseConfig);
