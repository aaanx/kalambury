//// make connection
let socket;
socket = io.connect('http://localhost:3000');
socket.on('mouse', newDrawing);
document.addEventListener('DOMContentLoaded', function() {
  
  //// chat
  function chatSetup() {
    const chatForm = document.getElementById('chat_form');
    const message = document.getElementById('message');
    const chat = document.getElementById('chat');
    const userForm = document.getElementById('user_form');
    const userFormContainer = document.getElementById('user_container');
    const chatContainer = document.getElementById('chat_container');
    const username = document.getElementById('username');
    const canvas = document.getElementById('canvas_container');
    const wordContainer = document.getElementById('password_container');
    const settingsContainer = document.getElementById('gameinfo_container');
    const controlsContainer = document.getElementById('controls_container');
    const navBox = document.getElementById('sidebar');

    chatForm.addEventListener('submit', function(e) {
      e.preventDefault();
      console.log('Submitted');
      socket.emit('send message', message.value);
      message.value = ' ';
      return false;
    });

    socket.on('new message', function(data) {
      const messageSent = document.createElement('div');
      messageSent.className = 'message-sent';
      messageSent.innerHTML = '<strong id="chat_user">'+data.user+': </strong>'+data.msg;
      chat.appendChild(messageSent);
    });

    userForm.addEventListener('submit', function(e) {
      e.preventDefault();
      socket.emit('new user', username.value, function(data) {
        if (data) {
          navBox.style.display = 'block';
          userFormContainer.style.display = 'none';
          chatContainer.style.display = 'block';
          canvas.style.display = 'block';
          wordContainer.style.display = 'block';
          settingsContainer.style.display = 'block';
          controlsContainer.style.display = 'block';

          setup();
        }
      });
      username.value = ' ';
      return false;
    });

    socket.on('get users', function(data) {
      let html = '';
      for (let i = 0; i < data.length; i++) {
        html += '<li class="users_item">'+data[i]+'</li>';
      }
      users.innerHTML = html;
    });
  }

  chatSetup();

  //// game info
  function displayGameInfo() {
    const playersBtn = document.getElementById('players_btn');
    const settingsBtn = document.getElementById('settings_btn');
    const playersDiv = document.getElementById('players');
    const settingsDiv = document.getElementById('settings');

    settingsDiv.style.display = 'none';
    playersDiv.style.display = 'block';

    playersBtn.addEventListener('click', function() {
      playersDiv.style.display = 'block';
      settingsDiv.style.display = 'none';
    });

    settingsBtn.addEventListener('click', function() {
      settingsDiv.style.display = 'block';
      playersDiv.style.display = 'none';
    });
  }

  displayGameInfo();

});

//// canvas set up
function setup() {
  let width = document.getElementById('canvas_container').clientWidth;
  let height = document.getElementById('canvas_container').clientHeight;
  
  const canvas = createCanvas(width, height);
  canvas.parent('canvas_container');
  canvas.class('canvas');
  canvas.position(0, 0);
  background(51);

  const resetBtn = createButton('reset');
  resetBtn.mousePressed(resetSketch);
  resetBtn.class('reset_btn');
  resetBtn.parent('controls_container');

}

function resetSketch() {
  background(51);  
}

function newDrawing(data) {
  console.log('Got: ' + data.x + ' ' +data.y);

  noStroke();
  fill(255, 0, 100);
  ellipse(data.x, data.y, 20, 20);
}

function mouseDragged() {
  console.log('Sending: ' + mouseX + ',' + mouseY);

  const data = {
    x: mouseX,
    y: mouseY
  }

  socket.emit('mouse', data);
  
  noStroke();
  fill(255);
  ellipse(mouseX, mouseY, 20, 20);
}

function draw() {
  //Nothing
}

//// password from firebase database
const database = firebase.database().ref().child('words');
let randomNum;

database.once('value').then(function(word) {
  const wordPlaceholder = document.getElementById('password');
  const words = word.val();
  const wordsLength = words.length;
  randomNum = Math.floor(Math.random() * wordsLength);

  wordPlaceholder.innerHTML = words[randomNum];
});

