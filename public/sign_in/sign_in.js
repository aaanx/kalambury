// display log form
const zalogujBtn = document.getElementById('zaloguj_btn');
zalogujBtn.addEventListener('click', function() {
  const logForm = document.querySelector('.zaloguj_form');
  logForm.style.display === 'none' ? logForm.style.display = 'block' : logForm.style.display = 'none';
});

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // user is logged in
    
    document.getElementById('wyloguj_btn').style.display = 'block';
    const userDisplay = document.getElementById('username_display');
    let userEmail = firebase.auth().currentUser.email;
    userDisplay.innerHTML = userEmail;
    
    //document.querySelector('.log_info').textContent = '';
    //document.querySelector('.zaloguj_form').style.display === 'none';

  } else {
    // user is not logged in
    document.getElementById('wyloguj_btn').style.display = 'none';
  }
});

function login() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  if (password.length < 6) {
    document.querySelector('.log_info').textContent = 'Please enter a password at least 6 characters long';
    return;
  } 

  firebase.auth().signInWithEmailAndPassword(email, password).then(function() {
    
    window.location = 'http://localhost:3000/';
    
  }).catch(function(error) {
    
    let errorCode = error.code;
    let errorMessage = error.message;

    if (errorCode === 'auth/invalid-email') {
      document.querySelector('.log_info').textContent = 'Wrong email format';
      document.querySelector('.log_info').style.color = 'red';
      console.log(errorMessage);
      return;
    } 

    if (errorCode === 'auth/user-not-found') {
      document.querySelector('.log_info').textContent = 'User not found';
      document.querySelector('.log_info').style.color = 'red';
      console.log(errorMessage);
      return;
    } 

    if (errorCode === 'auth/wrong-password') {
      document.querySelector('.log_info').textContent = 'Wrong password';
      document.querySelector('.log_info').style.color = 'red';
      console.log(errorMessage);
      return;
    } 

  });
}

function logout() {
  firebase.auth().signOut().then(function() {

  }).catch(function(error) {
    var errorMessage = error.message;
    console.log(errorMessage);
  });
}