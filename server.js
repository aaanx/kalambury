var express = require('express');
var app = express();

var server = app.listen(3000);
app.use(express.static('public'));

var socket = require('socket.io');
var io = socket(server);

io.sockets.on('connection', newConnection);

function newConnection(socket) {
    console.log('Client connected: ' + socket.id);
    
    socket.on('mouse', mouseMessage);
    
    function mouseMessage(data) {
        socket.broadcast.emit('mouse', data);
        //io.sockets.emit('mouse', data);
        //would also send the mssg back to client who sent it
        console.log(data);
    }

    socket.on('disconnect', disconnected);
    
    function disconnected() {
        console.log('Client has disconnected');
    }

}
