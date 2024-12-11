document.getElementById('register-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const role = document.getElementById('role').value;
    
    try {
        await firebase.auth().createUserWithEmailAndPassword(email, password);
        
        const user = firebase.auth().currentUser;
        
        await firebase.firestore().collection('users').doc(user.uid).set({
            email: email,
            role: role
        });
        
        window.location.href = 'login.html';
    } catch (error) {
        console.error(error.message);
        alert(error.message);
    }
});
