// src.firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCzqAolVTWnaRkNm-0pPPJikRnWk6z6NGY",
  authDomain: "dogfriends-4a67a.firebaseapp.com",
  projectId: "dogfriends-4a67a",
  storageBucket: "dogfriends-4a67a.appspot.com",
  messagingSenderId: "1083199046331",
  appId: "1:1083199046331:web:d89026ce209157421edf9e",
  measurementId: "G-D5EZPG2Z8F"
};

// Initialize Firebase and Firebase Authentication
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export {auth}
export {db}