// Kliknięcie button zarejestruj

function handleSignUp() {
    var email = document.getElementById('register_email').value;
    var passwordRepeat = document.getElementById('register_haslo2').value;
    var password = document.getElementById('register_haslo').value;

    if (email.length < 6) {
        document.querySelector('.register_info').textContent = 'Please enter an email address at least 6 characters long';
        return;
    }
    if (password.length < 6) {
        document.querySelector('.register_info').textContent = 'Please enter a password at least 6 characters long';
        return;
    }
    if (passwordRepeat !== password) {
        document.querySelector('.register_info').textContent = 'Repeat the same password';
        return;
    }

    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode == 'auth/weak-password') {
            document.querySelector('.register_info').textContent = 'The password is too weak';
            return;
        } 
        if (errorCode == 'auth/email-already-in-use') {
            document.querySelector('.register_info').textContent = 'Email is already in use';
            return;
        } 
        if (errorCode == 'auth/invalid-email') {
            document.querySelector('.register_info').textContent = 'Invalid email';
            return;
        }

        console.log(errorMessage); 
        //console.log(error); 
    });

    document.querySelector('.register_info').textContent = 'Succesful registration!';
}

function initApp() {
    // Listening for auth state changes.
    // [START authstatelistener]
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        var displayName = user.displayName;
        var email = user.email;
        var emailVerified = user.emailVerified;
        var photoURL = user.photoURL;
        var isAnonymous = user.isAnonymous;
        var uid = user.uid;
        var providerData = user.providerData;
      } else {
        // User is signed out.
      }
    });
    // [END authstatelistener]
    document.getElementById('register_btn').addEventListener('click', handleSignUp, false);
}

window.onload = function() {
    initApp();
};