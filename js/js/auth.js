import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
      import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-analytics.js";
      import {
        getAuth,
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
      const auth = getAuth(app);
    // ---------------------------------------------------------------------------------------
    document.getElementById("medical-register-Btn").addEventListener("click", () => {
        const firstName = document.getElementById("first-name").value;
        const lastName = document.getElementById("last-name").value;
        const phoneNumber = document.getElementById("phone-number").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        medicalRegister("users",email,firstName,lastName,phoneNumber,'',password)
       
      });
      document.getElementById("donor-register-Btn").addEventListener("click", () => {


      })

      async function addDocWithSpecificId(collectionName,documentName,fname,lname,phone,userType,path) {
        let ref = doc(db, collectionName, documentName);

        await setDoc(ref, {
          firstname: fname,
          lastName: lname,
          phone: phone,
          userType:userType
        })
          .then(() => {
            console.log("added done to database");
          })
          .catch((err) => {
            console.log(err);
          });
      }
      function medicalRegister(collectionName,email,firstName,lastName,phoneNumber,userType,password){
        
        createUserWithEmailAndPassword(auth, email, password)
        .then((credenitails) => {
          console.log("created success")
         addDocWithSpecificId(collectionName,email,userType)
         addDocWithSpecificId("medicalInfo",email,firstName,lastName,phoneNumber )
         localStorage.setItem("email",email)

      })
        .catch((err) => {
          console.log(err);
       });
      }
      function donorRegister(collectionName,email,firstName,lastName,phoneNumber,userType,password){


      }
   
   
    