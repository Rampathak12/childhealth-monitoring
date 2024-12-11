import { auth, db } from './firebase-config.js';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { collection, addDoc } from 'firebase/firestore';

onAuthStateChanged(auth, (user) => {
    if (user) {
        document.getElementById('user-info').textContent = `Logged in as: ${user.email}`;
    } else {
        window.location.href = '/index.html';
    }
});

document.getElementById('growth-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const childName = document.getElementById('child-name').value;
    const height = parseFloat(document.getElementById('height').value);
    const weight = parseFloat(document.getElementById('weight').value);
    const bmi = parseFloat(document.getElementById('bmi').value);
    const pressure = parseFloat(document.getElementById('pressure').value);

    const alertMessage = checkGrowthData(height, weight, bmi, pressure);

    if (alertMessage) {
        alert(alertMessage);
    }

    try {
        await addDoc(collection(db, 'growthData'), {
            childName,
            height,
            weight,
            bmi,
            pressure,
            date: new Date().toISOString()
        });

        alert('Growth data added successfully!');
    } catch (error) {
        console.error('Error adding growth data:', error.message);
        alert('Error adding growth data');
    }
});

function checkGrowthData(height, weight, bmi, pressure) {
    const heightRange = { min: 50, max: 150 };
    const weightRange = { min: 3, max: 60 };
    const bmiRange = { min: 10, max: 30 };
    const pressureRange = { min: 90, max: 140 };

    if (height < heightRange.min || height > heightRange.max) {
        return `Alert: The child's height (${height} cm) is outside the normal range.`;
    }

    if (weight < weightRange.min || weight > weightRange.max) {
        return `Alert: The child's weight (${weight} kg) is outside the normal range.`;
    }

    if (bmi < bmiRange.min || bmi > bmiRange.max) {
        return `Alert: The child's BMI (${bmi}) is outside the normal range.`;
    }

    if (pressure < pressureRange.min || pressure > pressureRange.max) {
        return `Alert: The child's blood pressure (${pressure} mmHg) is outside the normal range.`;
    }

    return null;
}

document.getElementById('logoutBtn').addEventListener('click', async () => {
    try {
        await signOut(auth);
        window.location.href = '/index.html';
    } catch (error) {
        console.error('Logout error:', error.message);
        alert('Error during logout');
    }
});
