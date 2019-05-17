// Kliknięcie button zarejestruj

function handleSignUp() {
    var email = document.getElementById('register_email').value;
    var passwordRepeat = document.getElementById('register_haslo2').value;
    var password = document.getElementById('register_haslo').value;

    if (email.length < 6) {
        alert('Please enter an email address with at least 6 letters');
        return;
    }
    if (password.length < 4) {
        alert('Please enter a password');
        return;
    }
    if (passwordRepeat !== password) {
        alert('Repeat the same password');
        return;
    }

    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode == 'auth/weak-password') {
            alert('The password is too weak.');
        } else {
            alert(errorMessage);
        }
        console.log(error);
    });
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