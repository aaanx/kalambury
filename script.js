// Kliknięcie zaloguj -> pokazanie formularza logowania
var zalogujBtn = document.getElementById('zaloguj_btn');
zalogujBtn.addEventListener('click', function() {
    var logForm = document.querySelector('.zaloguj_form');
    logForm.style.display === 'none' ? logForm.style.display = 'block' : logForm.style.display = 'none';
});

// Kliknięcie button zaloguj się

function toggleSignIn() {
    if (firebase.auth().currentUser) {
        firebase.auth().signOut();
    } else {
      var email = document.getElementById('email').value;
      var password = document.getElementById('password').value;

      if (email.length < 4) {
        alert('Please enter an email address');
        return;
      }
      if (password.length < 4) {
        alert('Please enter a password');
        return;
      }        

      firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;

        if (errorCode === 'auth/wrong-password') {
          alert('Wrong password.');
        } else {
          alert(errorMessage);
        }
        console.log(error);

        document.getElementById('log_btn').disabled = false;
        document.getElementById('log_btn').addEventListener('click', enterTheGame, false);
      });
    document.getElementById('log_btn').disabled = true;
    }
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
      document.getElementById('log_btn').disabled = false;
    });
    // [END authstatelistener]
    document.getElementById('log_btn').addEventListener('click', toggleSignIn, false);
}

window.onload = function() {
    initApp();
};

//

function enterTheGame() {
    location.replace("game.html");
}