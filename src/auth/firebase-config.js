import firebase from "firebase/compat/app";
import "firebase/compat/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDTQkCKKUPHnp5NHh0GLnmrg57Bx1M2D88",
    authDomain: "shopping-cart-app-9ecd7.firebaseapp.com",
    projectId: "shopping-cart-app-9ecd7",
    storageBucket: "shopping-cart-app-9ecd7.appspot.com",
    messagingSenderId: "414317389744",
    appId: "1:414317389744:web:64891c76059f88cac7d875",
    measurementId: "G-E69E6MMH8B"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

export {auth};