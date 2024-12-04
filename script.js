document.addEventListener('DOMContentLoaded', () => {

    // Handle child details form submission
    const childForm = document.getElementById('child-details-form');
    if (childForm) {
      childForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('child-name').value;
        const age = document.getElementById('child-age').value;
        const gender = document.getElementById('child-gender').value;
        const photo = document.getElementById('child-photo').files[0];
  
        console.log(`Saving child details: Name: ${name}, Age: ${age}, Gender: ${gender}`);
        window.location.href = 'growth-tracking.html';
      });
    }
  
    // Handle health metrics form submission
    const healthForm = document.getElementById('health-metrics-form');
    if (healthForm) {
      healthForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const temperature = document.getElementById('temperature').value;
        const bloodPressure = document.getElementById('blood-pressure').value;
        const heartRate = document.getElementById('heart-rate').value;
  
        console.log(`Submitting health metrics: Temperature: ${temperature}, BP: ${bloodPressure}, Heart Rate: ${heartRate}`);
  
        // Health metrics alert logic
        if (parseInt(temperature) > 38 || parseInt(heartRate) < 60 || parseInt(bloodPressure.split('/')[0]) > 140) {
          document.getElementById('health-alert').style.display = 'block';
        } else {
          document.getElementById('health-alert').style.display = 'none';
        }
      });
    }
  
    // Handle growth tracking form submission
    const growthForm = document.getElementById('growth-form');
    if (growthForm) {
      growthForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const height = document.getElementById('height').value;
        const weight = document.getElementById('weight').value;
        const bmi = document.getElementById('bmi').value;
  
        console.log(`Submitting growth metrics: Height: ${height}, Weight: ${weight}, BMI: ${bmi}`);
  
        // Growth alert logic
        if (bmi < 18.5 || bmi > 24.9) {
          document.getElementById('growth-alert').style.display = 'block';
        } else {
          document.getElementById('growth-alert').style.display = 'none';
        }
      });
    }
  });
  