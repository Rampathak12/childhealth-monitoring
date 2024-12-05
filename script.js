document.addEventListener('DOMContentLoaded', () => {
    // Handle Login Form Submission
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
      loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;
  
        console.log(`Logging in: ${email}`);
        // Simulate successful login and redirect to child-details page
        window.location.href = 'child-details.html';
      });
    }
  });
  