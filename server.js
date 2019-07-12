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

// connections
function newConnection(socket) {
    // save connections in an array
    connections.push({id: socket.id, isDrawing: false});
    //console.log('Connected: %s sockets connected', connections.length, socket.id);
    console.log(connections);


    if (connections.length < 2) {
        console.log("Waiting for a second player...");
    } else {
        pickUserToDraw();
    }
    
    // pick random user who will draw first
    function pickUserToDraw() {
        for (let i = 0; i < connections.length; i++) {
            connections[i].isDrawing = false;
        }
        let randomIndex = Math.floor(Math.random() * connections.length);
        console.log("Index to draw: " + randomIndex);
        connections[randomIndex].isDrawing = true;
        console.log(connections);

        socket.emit('connections', connections);
    }

    // listen to mouse event
    socket.on('mouse', mouseMessage);
    
    // mouse event occurs
    function mouseMessage(data) {
        // for(let i = 0; i < connections.length; i++) {
        //     if (connections[i].isDrawing === true) {
        //         // sending data to all clients except sender
                socket.broadcast.emit('mouse', data);
            // }
        // }
        console.log(data);
    }

    // Disconnect
    socket.on('disconnect', disconnected);
    
    function disconnected() {
        users.splice(users.indexOf(socket.username, 1));
        updateUsernames();

        connections.splice(connections.indexOf(socket), 1);
        console.log('Disconnected: %s sockets connected', connections.length);
    }

    // Send message
    socket.on('send message', function(data) {
        io.sockets.emit('new message', {msg: data, user: socket.username});
    });

    // New user
    socket.on('new user', function(data, callback) {
        callback(true);
        socket.username = data;
        users.push(socket.username);
        updateUsernames();
    });
    
    function updateUsernames() {
        io.sockets.emit('get users', users);
    }

}