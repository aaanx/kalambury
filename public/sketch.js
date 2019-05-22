var socket;

function setup() {
  var canvas = createCanvas(500, 500);
  canvas.parent('play_box');
  background(51);

  socket = io.connect('http://localhost:3000');
  socket.on('mouse', newDrawing);

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
  };

  socket.emit('mouse', data);
  
  noStroke();
  fill(255);
  ellipse(mouseX, mouseY, 20, 20);
}

function draw() {
  //Nothing
}
