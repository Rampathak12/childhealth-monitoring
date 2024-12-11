document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    try {
        await firebase.auth().signInWithEmailAndPassword(email, password);
        
        window.location.href = 'dashboard.html';
    } catch (error) {
        console.error(error.message);
        alert(error.message);
    }
});
