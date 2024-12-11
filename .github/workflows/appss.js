firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        firebase.firestore().collection('users').doc(user.uid).collection('children').get().then((querySnapshot) => {
            const childProfiles = document.getElementById('child-profiles');
            querySnapshot.forEach((doc) => {
                const child = doc.data();
                const childDiv = document.createElement('div');
                childDiv.innerHTML = `<p>Name: ${child.name}</p><p>Age: ${child.age}</p>`;
                childProfiles.appendChild(childDiv);
            });
        });
    } else {
        window.location.href = 'login.html';
    }
});

function createChildProfile() {
    window.location.href = 'createChild.html';
}
