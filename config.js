// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCevU23_-oNunDP1Nk5DpLc9yHJUklgxGs",
  authDomain: "proyecto-backfront-e8e6c.firebaseapp.com",
  projectId: "proyecto-backfront-e8e6c",
  storageBucket: "proyecto-backfront-e8e6c.appspot.com",
  messagingSenderId: "444175226881",
  appId: "1:444175226881:web:2862b2a9a6ce56c5a28800"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig)
const db = firebase.firestore()
const User = db.collection('Users')

module.exports = User