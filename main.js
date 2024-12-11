import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-database.js";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  databaseURL: "https://YOUR_PROJECT_ID.firebaseio.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
  measurementId: "YOUR_MEASUREMENT_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

// User login
document.getElementById('login-btn').addEventListener('click', function() {
  const email = prompt("Enter your email");
  const password = prompt("Enter your password");

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      document.getElementById('user-status').innerText = `Logged in as ${user.email}`;
    })
    .catch((error) => {
      const errorMessage = error.message;
      console.error(errorMessage);
    });
});

// User registration
document.getElementById('register-btn').addEventListener('click', function() {
  const email = prompt("Enter your email");
  const password = prompt("Enter your password");

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      document.getElementById('user-status').innerText = `Registered as ${user.email}`;
    })
    .catch((error) => {
      const errorMessage = error.message;
      console.error(errorMessage);
    });
});

// Data entry form
document.getElementById('growth-data-form').addEventListener('submit', function(event) {
  event.preventDefault();

  const childName = document.getElementById('child-name').value;
  const height = document.getElementById('height').value;
  const weight = document.getElementById('weight').value;
  const bmi = document.getElementById('bmi').value;
  const bloodPressure = document.getElementById('blood-pressure').value;

  // Save data to Firebase Realtime Database
  const dataRef = ref(database, 'growthData/' + Date.now());
  set(dataRef, {
    childName,
    height,
    weight,
    bmi,
    bloodPressure
  })
  .then(() => {
    alert("Growth data saved successfully!");
    // Clear form after saving
    document.getElementById('growth-data-form').reset();
  })
  .catch((error) => {
    console.error("Error saving data:", error);
  });
});
