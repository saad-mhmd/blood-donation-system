import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-analytics.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
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
    createNewUser(email, password, firstName, lastName, phoneNumber, "donor");
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
    createNewUser(email, password, firstName, lastName, phoneNumber, "medical", "test");
  });
}

// Check if the element exists before adding the event listener
// const googleRegisterDonorBtn = document.getElementById("google-register-donor");
// if (googleRegisterDonorBtn) {
//   googleRegisterDonorBtn.addEventListener("click", () => {
//     signInWithPopup(auth, googleProvider)
//       .then((result) => {
//         const user = result._tokenResponse;
//         // Extract user details
//         const firstName = user.firstName || "";
//         const lastName = user.lastName || "";
//         const email = user.email || "none";
//         addUserInfo("donor", email);
//         addMedicalInfo(email, firstName, lastName, "");
//         console.log(result);
//         localStorage.setItem("email",email)
//         localStorage.setItem("userType","medical")
//         window.location.href="../donorHomePage.html"
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//     console.log("google");
//     // Add your logic here
//   });
// }

// // Check if the element exists before adding the event listener
// const googleRegisterMedicalBtn = document.getElementById(
//   "google-register-medical"
// );
// if (googleRegisterMedicalBtn) {
//   googleRegisterMedicalBtn.addEventListener("click", () => {
//     console.log("clicked")
//     signInWithPopup(auth, googleProvider)
//       .then((result) => {
//         const user = result._tokenResponse;
//         // Extract user details
//         const firstName = user.firstName || "";
//         const lastName = user.lastName || "";
//         const email = user.email || "none";
//         addUserInfo("donor", email);
//         addMedicalInfo(email, firstName, lastName, "");
//         window.location.href="../Medical/medicalhomepage.html"

//         console.log(result);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//     console.log("google");
//     // Add your logic here
//   });
// }
function createNewUser(
  email,
  password,
  firstName,
  lastName,
  phoneNumber,
  userType,
  test
) {
  createUserWithEmailAndPassword(auth, email, password)
    .then((credenitails) => {
      if (userType == "medical") {
        const userInfoPromise = new Promise((resolve, reject) => {
          addUserInfo(userType, email, phoneNumber)
            .then(() => resolve())
            .catch((error) => reject(error));
        });
        // Both functions have completed successfully}

        const medicalInfoPromise = new Promise((resolve, reject) => {
          addMedicalCenterInfo(email, firstName, lastName, phoneNumber)
            .then(() => resolve())
            .catch((error) => reject(error));
        });
        Promise.all([userInfoPromise, medicalInfoPromise])
          .then(() => {
            // Both functions have completed successfully
            // Redirect the user based on userType
            if (userType === "medical") {
              localStorage.setItem("email", email);
              localStorage.setItem("userType", "medical");
              window.location.href = "../Medical/medicalhomepage.html";
            } else if (userType === "donor") {
              localStorage.setItem("email", email);
              localStorage.setItem("userType", "donor");
              window.location.href = "../Donor/donorhomepage.html";
            }
          })
          .catch((error) => {
            // Handle errors from either addUserInfo or addMedicalInfo
            console.error("An error occurred:", error);
            // Redirect the user to an error page or display an error message
          });
      }
      else {
        const userInfoPromise = new Promise((resolve, reject) => {
          addUserInfo(userType, email)
            .then(() => resolve())
            .catch((error) => reject(error));
        });
        // Both functions have completed successfully}

        const medicalInfoPromise = new Promise((resolve, reject) => {
          addMedicalInfo(email, firstName, lastName, phoneNumber)
            .then(() => resolve())
            .catch((error) => reject(error));
        });
        Promise.all([userInfoPromise, medicalInfoPromise])
          .then(() => {
            // Both functions have completed successfully
            // Redirect the user based on userType
            if (userType === "medical") {
              localStorage.setItem("email", email);
              localStorage.setItem("userType", "medical");
              window.location.href = "../Medical/medicalhomepage.html";
            } else if (userType === "donor") {
              localStorage.setItem("email", email);
              localStorage.setItem("userType", "donor");
              window.location.href = "../Donor/donorHomePage.html";
            }
          })
          .catch((error) => {
            // Handle errors from either addUserInfo or addMedicalInfo
            console.error("An error occurred:", error);
            // Redirect the user to an error page or display an error message
          });

      }
      // Wrap addUserInfo and addMedicalInfo in promises


      // addUserInfo(userType, email);
      // addMedicalInfo(email, firstName, lastName, phoneNumber);
      // if(userType=="medical"){
      //   localStorage.setItem("email",email)
      //   localStorage.setItem("userType","medical")
      //   window.location.href="../Medical/medicalhomepage.html"

      // }else if(userType=="donor"){
      //   localStorage.setItem("email",email)
      //   localStorage.setItem("userType","medical")
      //   window.location.href="../Donor/donorHomePage.html"

      // }
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
async function addMedicalCenterInfo(email, firstName, lastName, phoneNumber) {
  let ref = doc(db, "MedicalCenters", email);

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

const loginForm = document.getElementById("login-form");
if (loginForm) {
  loginForm.addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent form submission

    const email = document.getElementById("email-login").value;
    const password = document.getElementById("password-login").value;

    // Call loginUser function with email and password
    loginUser(email, password);
  });
}
function loginUser(email, password) {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Login successful, user information is available in userCredential.user
      const user = userCredential.user;
      console.log("Login successful:", user);
      loginWindow(email);
      // Redirect or perform further actions here
    })
    .catch((error) => {
      // Login failed, handle error
      console.error("Login failed:", error);
    });
}
async function loginWindow(email) {
  let ref = doc(db, "users", email);
  const docSnap = await getDoc(ref);
  if (docSnap.exists()) {
    const userType = docSnap.data().userType;
    if (userType == "medical") {
      localStorage.setItem("email", email);
      localStorage.setItem("userType", "medical");
      window.location.href = "../Medical/medicalhomepage.html";
    } else if (userType == "donor") {
      localStorage.setItem("email", email);
      localStorage.setItem("userType", "donor");
      window.location.href = "../Donor/donorhomepage.html";
    }

    console.log(userType);
  } else {
    console.log("no data");
  }
}

// saad-branch - we should improve this. Now I think it is loading on every page in Authentication directory
window.onload = function () {
  var checkbox = document.getElementById('auto-fill');
  if (checkbox) {
    checkbox.addEventListener('click', function () {
      toggleLocationFields(['longitude', 'latitude', 'address']);
    });
  }

  var phoneNumberInput = document.getElementById('phone-number');
  if (phoneNumberInput) {
    phoneNumberInput.addEventListener('input', function () {
      var pattern = new RegExp(phoneNumberInput.pattern);
      if (pattern.test(phoneNumberInput.value)) {
        // If the value matches the pattern, change the outline to green
        phoneNumberInput.style.outline = '2px solid green';
      } else {
        // If the value doesn't match the pattern, change the outline back to the default
        phoneNumberInput.style.outline = '';
      }
    });
  }

  var locationType = document.getElementById('location-type');
  var addressGroup = document.getElementById('address-group');
  var coordinatesGroup = document.getElementById('coordinates-group');

  if (locationType) {
    locationType.addEventListener('change', function () {
      if (locationType.value === 'address') {
        addressGroup.style.display = 'block';
        coordinatesGroup.style.display = 'none';
      } else {
        addressGroup.style.display = 'none';
        coordinatesGroup.style.display = 'flex';
      }
    });
  }
}

function toggleLocationFields(fields) {
  fields.forEach(field => {
    const element = document.getElementById(field);
    if (element) {
      element.disabled = !element.disabled;
    }
  });
}

//for the location type
document.getElementById('registration-form').addEventListener('submit', function (event) {
  var locationType = document.getElementById('location-type').value;
  var address = document.getElementById('address').value;
  var longitude = document.getElementById('longitude').value;
  var latitude = document.getElementById('latitude').value;

  if (locationType === 'address' && !address) {
    alert('Please enter an address.');
    event.preventDefault();
  } else if (locationType === 'coordinates' && (!longitude || !latitude)) {
    alert('Please enter both longitude and latitude.');
    event.preventDefault();
  }
});


document.addEventListener('DOMContentLoaded', (event) => {
  const countrySelect = document.getElementById("country");
  if (countrySelect) {
    countrySelect.addEventListener('change', toggleProvinceSelect);
  }
});

function toggleProvinceSelect() {
  var countrySelect = document.getElementById("country");
  var provinceSelect = document.getElementById("province");
  if (countrySelect.value === "") {
    provinceSelect.disabled = true;
  } else {
    provinceSelect.disabled = false;
  }
}

// for the openning and closing time
function toggleTimeInputs(checkboxId, openId, closeId) {
  const checkbox = document.getElementById(checkboxId);
  const openInput = document.getElementById(openId);
  const closeInput = document.getElementById(closeId);

  if (checkbox.checked) {
    openInput.disabled = false;
    closeInput.disabled = false;
  } else {
    openInput.disabled = true;
    closeInput.disabled = true;
  }
}
document.getElementById("monday-switch").addEventListener("change", function () {
  toggleTimeInputs("monday-switch", "monday-open", "monday-close");
});

document.getElementById("tuesday-switch").addEventListener("change", function () {
  toggleTimeInputs("tuesday-switch", "tuesday-open", "tuesday-close");
});

document.getElementById("wednesday-switch").addEventListener("change", function () {
  toggleTimeInputs("wednesday-switch", "wednesday-open", "wednesday-close");
});

document.getElementById("thursday-switch").addEventListener("change", function () {
  toggleTimeInputs("thursday-switch", "thursday-open", "thursday-close");
});

document.getElementById("friday-switch").addEventListener("change", function () {
  toggleTimeInputs("friday-switch", "friday-open", "friday-close");
});

document.getElementById("saturday-switch").addEventListener("change", function () {
  toggleTimeInputs("saturday-switch", "saturday-open", "saturday-close");
});

document.getElementById("sunday-switch").addEventListener("change", function () {
  toggleTimeInputs("sunday-switch", "sunday-open", "sunday-close");
});
