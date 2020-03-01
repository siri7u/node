'use strict';

const express = require('express');
const socketIO = require('socket.io');

const PORT = process.env.PORT || 3000;
const INDEX = '/index.html';

const server = express()
    .use(express.static(__dirname + '/public'))
    .listen(PORT, () => console.log(`Listening on ${PORT}`));


const io = socketIO(server);


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
                console.log("JOUEUR UPDATE")
                player = players[i];
            }

            print += "X :" + players[i].x + " Y: " + players[i].y + " ID: " + players[i].id + " .... ";

        }


        console.log(print);
        player.x = data.x;
        player.y = data.y;
        player.r = data.r;


    });

});


setInterval(go, 1000);

function go() {

    io.sockets.emit('go', players)

}