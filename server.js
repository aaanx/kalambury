var express = require('express');
var app = express(),
    http = require('http'),
    server = http.createServer(app),
    io = require('socket.io').listen(server);

var server = app.listen(3000);
app.use(express.static('public'));

var socket = require('socket.io');
var io = socket(server);

users = [];
connections = [];

console.log('Server running...');

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

io.sockets.on('connection', newConnection);

function newConnection(socket) {
    // Connect
    connections.push(socket);
    console.log('Connected: %s sockets connected', connections.length);
    
    // Mouse data - sketch
    socket.on('mouse', mouseMessage);
    
    function mouseMessage(data) {
        socket.broadcast.emit('mouse', data);
        //io.sockets.emit('mouse', data);
        //would also send the mssg back to client who sent it

        //if socket.draw = true to broadcast.emit 
        console.log(data);
    }

    // Disconnect
    socket.on('disconnect', disconnected);
    
    function disconnected() {
        connections.splice(connections.indexOf(socket), 1);
        console.log('Disconnected: %s sockets connected', connections.length);
    }

    // Send message
    socket.on('send message', function(data) {
        io.sockets.emit('new message', {msg: data});
    });

}
