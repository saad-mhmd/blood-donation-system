import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-analytics.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
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
// ---------------------------------------------------------------------------------------
// Check if the element exists before adding the event listener
const donorRegisterBtn = document.getElementById("donor-register-Btn");
if (donorRegisterBtn) {
  donorRegisterBtn.addEventListener("click", () => {
    const firstName = document.getElementById("first-name").value;
    const lastName = document.getElementById("last-name").value;
    const phoneNumber = document.getElementById("phone-number").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    createNewUser(email, password, firstName, lastName, phoneNumber,"donor");
  });
}

// Check if the element exists before adding the event listener
const medicalRegisterBtn = document.getElementById("medical-register-Btn");
if (medicalRegisterBtn) {
  medicalRegisterBtn.addEventListener("click", () => {
    const firstName = document.getElementById("first-name").value;
    const lastName = document.getElementById("last-name").value;
    const phoneNumber = document.getElementById("phone-number").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    createNewUser(email, password, firstName, lastName, phoneNumber,"medical");
  });
}

// Check if the element exists before adding the event listener
const googleRegisterDonorBtn = document.getElementById("google-register-donor");
if (googleRegisterDonorBtn) {
  googleRegisterDonorBtn.addEventListener("click", () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const user = result._tokenResponse;
        // Extract user details
        const firstName = user.firstName || "";
        const lastName = user.lastName || "";
        const email = user.email || "none";
        addUserInfo("donor", email);
        addMedicalInfo(email, firstName, lastName, "");
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
    console.log("google");
    // Add your logic here
  });
}

// Check if the element exists before adding the event listener
const googleRegisterMedicalBtn = document.getElementById(
  "google-register-medical"
);
if (googleRegisterMedicalBtn) {
  googleRegisterMedicalBtn.addEventListener("click", () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const user = result._tokenResponse;
        // Extract user details
        const firstName = user.firstName || "";
        const lastName = user.lastName || "";
        const email = user.email || "none";
        addUserInfo("donor", email);
        addMedicalInfo(email, firstName, lastName, "");
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
    console.log("google");
    // Add your logic here
  });
}
function createNewUser(email, password, firstName, lastName, phoneNumber,userType) {
  createUserWithEmailAndPassword(auth, email, password)
    .then((credenitails) => {
      console.log("created success");
      addUserInfo(userType, email);
      addMedicalInfo(email, firstName, lastName, phoneNumber);
    })
    .catch((err) => {
      console.log(err);
    });
}
async function addUserInfo(userType, email) {
  let ref = doc(db, "users", email);
  await setDoc(ref, {
    userType: userType,
  })
    .then(() => {
      console.log("added done to database");
    })
    .catch((err) => {
      console.log(err);
    });
}
async function addMedicalInfo(email, firstName, lastName, phoneNumber) {
  let ref = doc(db, "MedicalInfo", email);

  await setDoc(ref, {
    firstname: firstName || "",
    lastName: lastName || "",
    phone: phoneNumber || "",
  })
    .then(() => {
      console.log("added done to database");
    })
    .catch((err) => {
      console.log(err);
    });
}
function addMedicalCenterInfo() {}

