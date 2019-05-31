firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        // user is logged in
    } else {
        // user is not logged in
    }
});

function signup() {
    const email = document.getElementById('r_email').value;
    const password = document.getElementById('r_password').value;    
    const passwordRepeat = document.getElementById('r_password2').value;

    if (email.length < 6) {
        document.querySelector('.r_info').textContent = 'Please enter an email address at least 6 characters long';
        return;
    }
    if (password.length < 6) {
        document.querySelector('.r_info').textContent = 'Please enter a password at least 6 characters long';
        return;
    }
    if (passwordRepeat !== password) {
        document.querySelector('.r_info').textContent = 'Repeat the same password';
        return;
    }

    firebase.auth().createUserWithEmailAndPassword(email, password).then(function() {

        document.querySelector('.r_info').textContent = 'Succesful registration!';
        
    }).catch(function(error) {
        let errorCode = error.code;
        let errorMessage = error.message;
        console.log(errorMessage); 

        if (errorCode == 'auth/weak-password') {
            document.querySelector('.r_info').textContent = 'The password is too weak';
            return;
        } 
        if (errorCode == 'auth/email-already-in-use') {
            document.querySelector('.r_info').textContent = 'Email is already in use';
            return;
        } 
        if (errorCode == 'auth/invalid-email') {
            document.querySelector('.r_info').textContent = 'Invalid email';
            return;
        }
    });
}