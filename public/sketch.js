var socket;
socket = io.connect('http://localhost:3000');
socket.on('mouse', newDrawing);

document.addEventListener('DOMContentLoaded', function() {
  function chatSetup() {
    var messageForm = document.getElementById('messageForm');
    var message = document.getElementById('message');
    var chat = document.getElementById('chat');
    //var submitBtn = document.getElementById('submit_btn');
  
    messageForm.addEventListener('submit', function(e) {
      e.preventDefault();
      console.log('Submitted');
      socket.emit('send message', message.value);
      message.value = ' ';
      return false;
    });

    socket.on('new message', function(data) {
      var messageSent = document.createElement('div');
      messageSent.className = 'well';
      messageSent.textContent = data.msg;
      chat.appendChild(messageSent);
    });
  }
  chatSetup();
});

function setup() {
  var canvas = createCanvas(500, 500);
  canvas.parent('play_box');
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

  var data = {
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
