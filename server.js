'use strict';

/* const express = require('express');
const socketIO = require('socket.io');
const path = require("path");

const PORT = process.env.PORT || 5000;
const INDEX = '/public/index.html';

const server = express()
    .use(express.static(path.join(__dirname, '/public')))
    .listen(PORT, () => console.log(`Listening on ${PORT}`));

const io = socketIO(server); */


//


/* var socketIO = require('socket.io');
var express = require('express');
var path = require('path');


var app = express()
const io = socketIO();

app.use(express.static(path.join(__dirname, 'public')));

app.set('port', (process.env.PORT || 5000));

// Start node server
app.listen(app.get('port'), function() {
    console.log('Node server is running on port ' + app.get('port'));
}); */

var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

app.use(express.static('public'));

server.listen(process.env.PORT || 5000);
console.log('Server running...');


const players = [];

function Player(id, x, y, r) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.r = r;
}


io.on('connection', (socket) => {
    console.log('Client connected ' + socket.id);

    socket.on('disconnect', () => {
        console.log('Client disconnected & removed from the list')
    });

    socket.on('new-player', function(data) {
        console.log(socket.id + " " + data.x + " " + data.y);
        //envoie du joueur
        var player = new Player(data.id, data.x, data.y, data.r);
        players.push(player);
    });

    socket.on('update', function(data) {
        // console.log(socket.id + " " + data.x + " " + data.y);

        var player;

        var print = " ";
        //console.log(Object.keys(players).length)
        for (var i = 0; i < Object.keys(players).length; i++) {
            if (data.id === players[i].id) {
                //console.log("JOUEUR UPDATE")
                player = players[i];
            }

            print += "X :" + players[i].x + " Y: " + players[i].y + " ID: " + players[i].id + " .... ";

        }
        //console.log(print);
        player.x = data.x;
        player.y = data.y;
        player.r = data.r;

    });
});


setInterval(go, 30);

function go() {
    io.sockets.emit('go', players)
}