/* function newDrawing(data) {
    noStroke();
    fill(255);
    ellipse(data.x, data.y, 20, 20);

} */

var p;
var players = [];

function setup() {
    console.log("setup");
    var canvas = createCanvas(1280, 720);
    fill(0, 0, 255);
    ellipse(10, 10, 10, 10);
    canvas.parent('sketch-holder');
    // socket.on('mouse', newDrawing);


    //---
    xx = random(0, width);
    yy = random(0, height);

    p = new Player(xx, yy, 56);
    var data = {
        x: p.x,
        y: p.y,
        r: p.r,
        id: socket.id,
    }
    socket.emit('new-player', data);

    socket.on('go', function(data) {
        players = data;
        //console.log(players);
    });
}


function draw() {

    background(51);
    fill(0, 0, 255);
    ellipse(10, 10, 10, 10);


    for (var i = 0; i < Object.keys(players).length; i++) {

        if (socket.id !== players[i].id) {
            fill(0, 0, 255);
            ellipse(players[i].x, players[i].y, players[i].r, players[i].r);

            fill(255);
            textAlign(CENTER);
            textSize(20);
            text(players[i].id, players[i].x, players[i].y, 20);

            //console.log(players);
        }
    }
    p.show();
    p.update();

    var data = {
        x: p.x,
        y: p.y,
        r: p.r,
        id: socket.id,
    }
    socket.emit('update', data);


}


/* 
function mouseDragged() {


    console.log(mouseX + " " + mouseY);
    var data = {
        x: mouseX,
        y: mouseY,
    }

    socket.emit('mouse', data);

    noStroke();
    fill(255);
    ellipse(mouseX, mouseY, 20, 20);
} */