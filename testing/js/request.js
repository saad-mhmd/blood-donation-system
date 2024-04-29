let info = [];
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
const donationRequestCollectionRef = collection(db, "DonationRequests");
const datareguest = [];
document.getElementById("tablebody").innerHTML = "";

getReguests();

async function getReguests() {
  try {
    const q = query(
      donationRequestCollectionRef,
      //   where("status", "==", "pendding"),
      where("centerName", "==", "AUB")
    );

    const querySnapshot = await getDocs(q);
    const counter = querySnapshot.size;
    document.getElementById("users-counter").innerHTML = counter;

    querySnapshot.forEach((doc) => {
      datareguest.push(doc.data());
      datareguest.email = doc.data().email;
    });
    // console.log(datareguest);

    let donationCount = querySnapshot.size;
    // document.getElementById("donation-counter").innerHTML = donationCount;

    // Log or use the 'data' array as needed
  } catch (error) {
    console.error("Error getting documents: ", error);
  }
  filltable();
  //   filltable(datareguest);
}

async function filltable() {
  console.log(datareguest);

  for (let i = 0; i < datareguest.length; i++) {
    console.log(datareguest[i].email);
    let ref = doc(db, "MedicalInfo", datareguest[i].email);
    const docSnap = await getDoc(ref);
    if (docSnap.exists()) {
      info.push(docSnap.data());
      let content = `
      <tr>
      <td>${info[i].firstName + info[0].lastName}</td>
      <td>${datareguest[i].bloodQuantity}</td>
      <td>${info[i].bloodType}</td>
      <td>${datareguest[i].city}</td>
      <td><span class="status inprogress">${datareguest[i].status}</span></td>
     <td>${info[i].phoneNumber}</td>
     <td>action</td>
     </tr>`;
      document.getElementById("tablebody").innerHTML += content;
    } else {
      console.log("no data");
    }
    // console.log(info);
  }
}
console.log(info);
