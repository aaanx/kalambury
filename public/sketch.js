let socket;
socket = io.connect('http://localhost:3000');
socket.on('mouse', newDrawing);

//// chat
document.addEventListener('DOMContentLoaded', function() {
  function chatSetup() {
    const messageForm = document.getElementById('messageForm');
    const message = document.getElementById('message');
    const chat = document.getElementById('chat');
  
    messageForm.addEventListener('submit', function(e) {
      e.preventDefault();
      console.log('Submitted');
      socket.emit('send message', message.value);
      message.value = ' ';
      return false;
    });

    socket.on('new message', function(data) {
      const messageSent = document.createElement('div');
      messageSent.className = 'message-sent';
      messageSent.textContent = data.msg;
      chat.appendChild(messageSent);
    });
  }

  chatSetup();

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
  let width = document.getElementById('play_box').clientWidth;
  let height = document.getElementById('play_box').clientHeight;
  
  const canvas = createCanvas(width, height);
  canvas.parent('play_box');
  canvas.class('canvas');
  canvas.position(0, 0);
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

//// words from firebase database
const database = firebase.database().ref().child('words');
let randomNum;

database.once('value').then(function(word) {
  const wordPlaceholder = document.getElementById('word');
  const words = word.val();
  const wordsLength = words.length;
  randomNum = Math.floor(Math.random() * wordsLength);

  wordPlaceholder.innerHTML = words[randomNum];
});

