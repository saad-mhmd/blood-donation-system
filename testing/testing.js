import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-analytics.js";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";
const firebaseConfig = {
  apiKey: "AIzaSyB5piM8HyYATgWqMPi2U6bwAVz94Q189Bs",
  authDomain: "fir-basics-569a0.firebaseapp.com",
  projectId: "fir-basics-569a0",
  storageBucket: "fir-basics-569a0.appspot.com",
  messagingSenderId: "971203436246",
  appId: "1:971203436246:web:11d5aa9c6a02ee8dc6f377",
  measurementId: "G-LGY93EHL4E",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const googleProvider = new GoogleAuthProvider();
import {
  getFirestore,
  doc,
  getDoc,
  getDocs, //get all documents inside one collection
  setDoc,
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  deleteField,
  query,
  where,
  orderBy,
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";
const db = getFirestore();
const auth = getAuth();
let usersCount=0;
let donationCount=0
// --------------------------------
// Reference to the "user" collection
const userCollectionRef = collection(db, "users");
const donationRequestCollectionRef = collection(db, "DonationRequests");

// Function to count documents in "user" collection
async function countUserDocuments() {
  try {
    const querySnapshot = await getDocs(userCollectionRef);
    usersCount = querySnapshot.size;
    setupDashbord()
    console.log("Number of documents in 'user' collection:", usersCount);
  } catch (error) {
    console.error("Error getting documents: ", error);
  }
}


countDonationRequestDocuments()
countDonationDocuments()
async function countDonationDocuments(){
    try {
        const q = query(donationRequestCollectionRef, 
          where("status", "==", "done" ),
          where("centerName","==","AUB")
      
      );
        const querySnapshot = await getDocs(q);
      const counter = querySnapshot.size;
       document.getElementById("accepted-donation").innerHTML=counter;
      } catch (error) {
        console.error("Error getting documents: ", error);
      }

}
async function countDonationRequestDocuments() {
    try {
      const q = query(donationRequestCollectionRef, 
        where("status", "==", "pendding" ),
        where("centerName","==","AUB")
    
    );
      const querySnapshot = await getDocs(q);
     donationCount = querySnapshot.size;
     document.getElementById("donation-counter").innerHTML=donationCount;
    } catch (error) {
      console.error("Error getting documents: ", error);
    }
  }
function setupDashbord(){
    document.getElementById("users-counter").innerHTML=usersCount;
    

}

// Call the function to count documents
countUserDocuments();