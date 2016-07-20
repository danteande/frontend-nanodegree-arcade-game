// Enemies our player must avoid
var Enemy = function(x, y, sprite) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.flipSprite = 'images/enemy-bug-flip.png';
    this.x = x;
    this.y = y;
    //speed with base of 100 plus random addition to 125%
    this.speed = 100 + (Math.random() * 125);
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    //after every successful win, the game 'levels' up with the
    //game getting increasingly more difficult
    switch (level) {

        case 1:

            //allow enemies to move to 600 creating a delay
            // before they re-spawn on the left side
            if (this.x < 600) {
                this.x += this.speed * dt;
            } else {
                this.x = 0;


            };
            break;

        //level 2 and all subsequent even-numbered levels
        //have the enemies moving right-to-left
        // and re-spawn interval is diminsihed
        case 2:
            if (this.x > -550) {
                this.x -= this.speed * dt;
            } else {
                this.x = 410;


            };
            break;
        // case 3 and all subsequent levels
        //enemy speed increases
        case 3:
            if (this.x < 500) {
                this.x += this.speed * dt * 1.5;
            } else {
                this.x = 0;

            };
            break;
        case 4:
            if (this.x > -450) {
                this.x -= this.speed * dt * 2.0;
            } else {
                this.x = 410;


            };
            break;
        //the default case tests for odd/even level
        //then moves enemies in appropriate direction
        //and slowly increases speed
        default:
            if (level & 1) {
                if (this.x < 425) {

                    this.x += this.speed * dt * (2 + (level * 0.05));
                } else {
                    this.x = 0;
                }
            } else {
                if (this.x > -425) {

                    this.x -= this.speed * dt * (2 + (level * 0.05));
                } else {
                    this.x = 410;
                }
            };

    };
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    console.log(level);
    if (level & 1) {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    //use different enemy art for right-to-left movement
    } else {
        ctx.drawImage(Resources.get(this.flipSprite), this.x, this.y);
    };

};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function() {
    // load player png - changed art just for fun
    this.sprite = 'images/char-cat-girl.png';

    //set player initial location
    this.x = 200;
    this.y = 400;

    //win and lose variable - set to 1 for a win and 2 for a loss
    //to trigger appropriate events
    this.win1lose2 = 0;
    // custom art for win and lose messages
    this.winart = 'images/char-boy-win.png';
    this.loseart = 'images/enemy-bug-lose.png';
    this.tryAgain = 'images/try-again.png';
    this.keepGoing = 'images/keep-going.png';
};
//function reads win/lose state and triggers appropriate art
//with corresponding message
Player.prototype.wonorlost = function() {
    if (this.win1lose2 == 1) {
        ctx.drawImage(Resources.get(this.winart), 2, 20);
        ctx.drawImage(Resources.get(this.keepGoing), 205, 20);
    };
    if (this.win1lose2 == 2) {
        ctx.drawImage(Resources.get(this.loseart), 404, 30);
        ctx.drawImage(Resources.get(this.tryAgain), 205, 15);
    };
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    //run win or lose function test here
    player.wonorlost();

};

Player.prototype.update = function(dt) {};

Player.prototype.handleInput = function(key) {
    //reset win/lose variable when player enters more input
    //after a win or a loss
    this.win1lose2 = 0;
    switch (key) {
        case 'left':

            if (this.x < 2) {
                break;
            } else {
                this.x -= 101;
            };
            break;
        case 'right':
            if (this.x > 399) {
                break;
            } else {
                this.x += 101;
            };
            break;
        case 'up':

            this.y -= 83;

            if (this.y < 30) {
                //player wins, set win/loss variable to 'win'
                //and increment level
                console.log("Player Wins!");
                this.win1lose2 = 1;
                level += 1;
                console.log(level);
                this.x = 200;
                this.y = 400;
            };
            break;
        case 'down':
            if (this.y > 399) {
                break;
            } else {
                this.y += 83;
            };
            break;
        default:
            console.log("wrong key for moving player");
    };
};

var level = 1;
//collision function
//rect1 is player, rect2 is enemy
var checkCollision = function(item, index, arr) {
    var rect1 = {
        x: player.x + 35,
        y: player.y + 20,
        width: 70,
        height: 50
    };
    var rect2 = {
        x: item.x + 25,
        y: item.y,
        width: 85,
        height: 83
    };
    if (rect1.x < rect2.x + rect2.width &&
        rect1.x + rect1.width > rect2.x &&
        rect1.y < rect2.y + rect2.height &&
        rect1.height + rect1.y > rect2.y) {
        //if collision detected set win/loss to 'lose'
        player.win1lose2 = 2;
        player.x = 200;
        player.y = 400;
    };
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var enemy1 = new Enemy(2, 55, 'images/enemy-bug.png');
var enemy2 = new Enemy(2, 140, 'images/enemy-bug.png');
var enemy3 = new Enemy(2, 225, 'images/enemy-bug.png');
var enemy4 = new Enemy(2, 310,  'images/enemy-bug.png');

var allEnemies = [enemy1,enemy2,enemy3,enemy4];

var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
