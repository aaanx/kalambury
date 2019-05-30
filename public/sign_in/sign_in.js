// klik zaloguj -> pokazanie formularza logowania
var zalogujBtn = document.getElementById('zaloguj_btn');
zalogujBtn.addEventListener('click', function() {
    var logForm = document.querySelector('.zaloguj_form');
    logForm.style.display === 'none' ? logForm.style.display = 'block' : logForm.style.display = 'none';
});

// klik button zaloguj się -> weryfikacja danych -> jeśli dane ok -> logowanie

function toggleSignIn() {
    if (firebase.auth().currentUser) {
        firebase.auth().signOut();
    } else {
      var email = document.getElementById('email').value;
      var password = document.getElementById('password').value;

      if (email.length < 4) {
        document.querySelector('.log_info').textContent = 'Please enter an email address';
        return;
      }
      if (password.length < 4) {
        document.querySelector('.log_info').textContent = 'Please enter a password at least 4 characters long';
        return;
      }        

      firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        location.reload(); 
        // how to check every error without page reload
        // error -> correct -> diff error -> correct -> diff error -> correct -> ok, log-in

        if (errorCode === 'auth/invalid-email') {
            document.querySelector('.log_info').textContent = 'Wrong email format';
            document.querySelector('.log_info').style.color = 'red';
            console.log(errorMessage)
            return;
        } 

        if (errorCode === 'auth/user-not-found') {
            document.querySelector('.log_info').textContent = 'User not found';
            document.querySelector('.log_info').style.color = 'red';
            console.log(errorMessage)
            return;
        } 

        if (errorCode === 'auth/wrong-password') {
            document.querySelector('.log_info').textContent = 'Wrong password';
            document.querySelector('.log_info').style.color = 'red';
            console.log(errorMessage)
            return;
        } 

        location.reload(); 
      });

      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          let userEmail = firebase.auth().currentUser.email;
          localStorage.setItem('user', userEmail);
          console.log(userEmail);
          document.getElementById('log_btn').disabled = false;
          window.location = 'http://localhost:3000/';
        } else {
          document.getElementById('log_btn').disabled = true;
          console.log('try again');
          return false;
        }
      });
      //document.getElementById('log_btn').addEventListener('click', enterTheGame, false);
    }
}

function initApp() {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
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
    document.getElementById('log_btn').addEventListener('click', toggleSignIn, false);
}

window.onload = function() {
    initApp();
};

// function enterTheGame() {
//     location.replace("http://localhost:3000/");
// }