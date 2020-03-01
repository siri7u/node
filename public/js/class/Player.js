function Player(x, y, r) {

    this.x = x;
    this.y = y;
    this.r = 64;

    var speed = 600;

    this.update = function() {
        //console.log("X: " + this.x + " Y: " + this.y);

        if (keyIsDown(90)) { //Z
            this.y = Math.round(this.y - speed / frameRate());
        }
        if (keyIsDown(81)) { //Q
            this.x = Math.round(this.x - speed / frameRate());
        }
        if (keyIsDown(83)) { //S
            this.y = Math.round(this.y + speed / frameRate());
        }
        if (keyIsDown(68)) { //D
            this.x = Math.round(this.x + speed / frameRate());
        }

    }

    this.show = function() {

        fill(255);
        ellipse(this.x, this.y, this.r, this.r);
    }
}