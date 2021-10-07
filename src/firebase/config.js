import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'


// Optionally import the services that you want to use
//import "firebase/auth";
//import "firebase/database";
//import "firebase/firestore";
//import "firebase/functions";
//import "firebase/storage";





// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBq3GhVG80p7kj34wXmPuepmLZihzqETTc",
    authDomain: "clicks-jobs.firebaseapp.com",
    projectId: "clicks-jobs",
    storageBucket: "clicks-jobs.appspot.com",
    messagingSenderId: "637670265349",
    appId: "1:637670265349:web:1bd7928cd9943d9226826c",
    measurementId: "G-28S7FDNJ99"
  };

// firebase.initializeApp(firebaseConfig)


let instance

export default function getFirebase() {
    if (typeof window !== "undefined") {
        if (instance) return instance
        instance = firebase.initializeApp(firebaseConfig);
        return instance
    }

    return null
}

