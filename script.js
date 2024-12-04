import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js";
import { Chart } from "https://cdn.jsdelivr.net/npm/chart.js";

const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID",
  };
  

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();

async function signUp(email, password) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    console.log('User signed up:', user);
  } catch (error) {
    console.error('Error signing up:', error.message);
  }
}

async function signIn(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    console.log('User signed in:', user);
  } catch (error) {
    console.error('Error signing in:', error.message);
  }
}

async function addProfile(name, age, gender, medicalHistory) {
  try {
    const docRef = await addDoc(collection(db, "profiles"), {
      name: name,
      age: age,
      gender: gender,
      medicalHistory: medicalHistory,
    });
    alert("Profile added successfully!");
    loadProfiles();
  } catch (e) {
    console.error("Error adding profile:", e);
  }
}

async function loadProfiles() {
  const querySnapshot = await getDocs(collection(db, "profiles"));
  const profileList = document.getElementById("profile-list");
  profileList.innerHTML = "";
  querySnapshot.forEach((doc) => {
    const profile = doc.data();
    const profileDiv = document.createElement("div");
    profileDiv.classList.add("profile");
    profileDiv.innerHTML = `
      <h3>${profile.name}</h3>
      <p>Age: ${profile.age}</p>
      <p>Gender: ${profile.gender}</p>
      <p>Medical History: ${profile.medicalHistory}</p>
    `;
    profileList.appendChild(profileDiv);
  });
}

async function addGrowthMetrics(profileId, height, weight, bmi) {
  try {
    const docRef = await addDoc(collection(db, "growthMetrics"), {
      profileId: profileId,
      height: height,
      weight: weight,
      bmi: bmi,
      date: new Date().toISOString(),
    });
    alert("Growth metrics added!");
    renderGrowthChart();
  } catch (e) {
    console.error("Error adding growth metrics:", e);
  }
}

function renderGrowthChart() {
  const ctx = document.getElementById("growthChart").getContext("2d");
  new Chart(ctx, {
    type: "line",
    data: {
      labels: ["Height (cm)", "Weight (kg)", "BMI"],
      datasets: [
        {
          label: "Growth Metrics",
          data: [150, 45, 18],
          borderColor: "blue",
        },
      ],
    },
  });
}

document.getElementById("add-profile-btn").addEventListener("click", () => {
  const name = prompt("Enter child name:");
  const age = parseInt(prompt("Enter child age:"), 10);
  const gender = prompt("Enter child gender (Male/Female):");
  const medicalHistory = prompt("Enter medical history:");
  if (name && age && gender && medicalHistory) {
    addProfile(name, age, gender, medicalHistory);
  }
});

document.getElementById("growth-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const height = parseFloat(document.getElementById("height").value);
  const weight = parseFloat(document.getElementById("weight").value);
  const bmi = parseFloat(document.getElementById("bmi").value);
  addGrowthMetrics("profile_id", height, weight, bmi);
});

document.addEventListener("DOMContentLoaded", loadProfiles);
