
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
  FieldValue,
  addDoc,
  updateDoc,
  increment,
  deleteDoc,
  deleteField,
  query,
  where,
  orderBy,
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";
const db = getFirestore();
const auth = getAuth();
const bloodtypes=["A+","A-","B+","B-","AB+","AB-","O+",'O-']
let test=[]
// -------------------------------------------------------------------------------


// document.getElementById("btn-A+").addEventListener("click",()=>{
//     console.log("test")
// })
const buttons = document.querySelectorAll('#blood-bank-table button');
buttons.forEach(button => {
    button.classList.add("btn")
    button.addEventListener('click', () => {
        // Get the blood type associated with the button
        const bloodType = button.id.replace('btn-', '');
        updateValue(bloodType,button);
    });
});

// Function to update the value in Firestore
async function updateValue(bloodType,button) {
    // Get the input field associated with the button
    const inputField = button.parentNode.previousElementSibling.querySelector('input');
    const incrementBy = parseInt(inputField.value) || 0; // Get the value from the input field

    // Get a reference to the document
    const docRef = doc(db, "BloodBanks", "medicalemail@gmail.com");

    // Update the blood type field by the specified amount
    await updateDoc(docRef, { [bloodType]: increment(incrementBy) });

    // Log a message to indicate that the update was successful
    console.log(`Updated ${bloodType} by ${incrementBy}`);
    getBloodValues()
}
async function getBloodValues() {
    try {
        test=[]
        // Reference to the document containing blood values
        const docRef = doc(db, "BloodBanks", "medicalemail@gmail.com");

        // Get the document snapshot
        const docSnap = await getDoc(docRef);

        // Check if the document exists
        if (docSnap.exists()) {
            // Extract the data from the document
            const bloodData = docSnap.data();

            // Loop through each blood type
            bloodtypes.forEach(bloodType => {
                // Get the element corresponding to the blood type
                const element = document.getElementById(`pints-${bloodType}`);

                // Check if the element exists and the blood type is in the data
                if (element && bloodData.hasOwnProperty(bloodType)) {
                    // Set the value in the table
                    element.textContent = bloodData[bloodType].toString();
                    test.push([bloodType, bloodData[bloodType]]);
                    updateChart()
                }
            });
        } else {
            console.log("Document does not exist");
        }
    } catch (error) {
        console.error("Error getting blood values:", error);
    }
}
getBloodValues()

const ctx2 = document.getElementById("myChart2").getContext("2d");
        const myChart2 = new Chart(ctx2, {
          type: "bar",
          data: {
            labels: ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"],
            datasets: [
              {
                label: "Bloods Bank",
                data: [10, 20, 10, 20, 25, 0, 30, 9],
                backgroundColor: [
                  "rgba(255, 99, 132, 1)",
                  "rgba(54, 162, 235, 1)",
                  "rgba(255, 206, 86, 1)",
                  "rgba(75, 192, 192, 1)",
                  "rgba(153, 102, 255, 1)",
                  "rgba(255, 159, 64, 1)",
                  "rgba(255, 159, 64, 1)",
                  "rgba(255, 99, 132, 1)",
                ],
                borderWidth: 2,
              },
            ],
          },
          options: {
            responsive: true,
          },
        });
        function updateChart() {
            setTimeout(()=>{
                const bloodTypes = test.map(blood => blood[0]);
                const bloodValues = test.map(blood => blood[1]);
                
                // Update the data property of the chart's configuration
                myChart2.data.labels = bloodTypes;
                myChart2.data.datasets[0].data = bloodValues;
                
                // Update the chart
                myChart2.update();
                
            },100)



        }
       
      