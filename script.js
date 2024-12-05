// Handle login form submission
document.getElementById("login-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form submission

    // Get the username and password values
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Basic login validation (you can replace with more secure validation)
    if (username === "admin" && password === "password123") {
        // Hide login page, show vaccine page
        document.getElementById("login-page").style.display = "none";
        document.getElementById("vaccine-page").style.display = "block";
    } else {
        alert("Invalid credentials. Please try again.");
    }
});


function showVaccinePage() {
    document.getElementById("child-health-page").style.display = "none";
    document.getElementById("vaccine-page").style.display = "block";
}

// Function to navigate to the child health data page
function showChildHealthPage() {
    document.getElementById("vaccine-page").style.display = "none";
    document.getElementById("child-health-page").style.display = "block";
}

// Handle vaccine status changes (checkbox functionality)
document.querySelectorAll('input[type="checkbox"]').forEach(function(checkbox) {
    checkbox.addEventListener("change", function() {
        const isChecked = checkbox.checked;
        const vaccineRow = checkbox.closest("tr"); // Get the row of the vaccine
        const vaccineName = vaccineRow.querySelector("td").textContent; // Get the vaccine name

        if (isChecked) {
            alert(`You have marked the vaccine "${vaccineName}" as taken.`);
        } else {
            alert(`You have unmarked the vaccine "${vaccineName}".`);
        }
    });
});

// Optional: Add a congratulatory message when all vaccines are marked as taken
function checkVaccineCompletion() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    const allChecked = Array.from(checkboxes).every(function(checkbox) {
        return checkbox.checked;
    });

    if (allChecked) {
        alert("Congratulations! All vaccines have been marked as taken.");
    }
}

// Run the check when a checkbox is clicked
document.querySelectorAll('input[type="checkbox"]').forEach(function(checkbox) {
    checkbox.addEventListener("change", checkVaccineCompletion);
});
