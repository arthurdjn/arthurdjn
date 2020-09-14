/*
 * File: canvas.js
 * Creation: Sunday July 5th 2020
 * Author: Arthur Dujardin
 * Contact: arthur.dujardin@ensg.eu
 *          arthurd@ifi.uio.no
 * --------
 * Copyright (c) 2020 Arthur Dujardin
 */


// GLOBAL PARAMETERS
var CANVAS_WIDTH = $('#canvas-container').width();
var NUM_CELLS = 15;
var BBOX_GAME =     [CANVAS_WIDTH/2, 0, CANVAS_WIDTH/2, CANVAS_WIDTH/2];
var BBOX_NETWORK =  [0,              0, CANVAS_WIDTH/2, CANVAS_WIDTH/2];
var CELL_SIZE = Math.floor(Math.max(BBOX_GAME[2], BBOX_GAME[3]) / NUM_CELLS);
updateWindow()      // Always reset the cell size for responsive gameplay

// IN GAME PARAMS
var GAME = new Game(NUM_CELLS, NUM_CELLS);
GAME.start();
var SNAKE = GAME.snakes[0];
SNAKE.direction = "UP";         // No random initial direction when for the player
SNAKE.next_direction();
var IS_ALIVE;
var PAUSE = true;
var TRAIN = false;
var RUN_AI = false;


function updateWindow() {
    /* Update the canvas dimensions if the document page has been resized */
    
	window.addEventListener("resize", function(event) {
        CANVAS_WIDTH = $('#canvas-container').width();
		resizeCanvas(CANVAS_WIDTH, CANVAS_WIDTH / 2)
        BBOX_GAME =     [CANVAS_WIDTH/2, 0, CANVAS_WIDTH/2, CANVAS_WIDTH/2];
        BBOX_NETWORK =  [0,              0, CANVAS_WIDTH/2, CANVAS_WIDTH/2];
        CELL_SIZE = Math.floor(Math.max(BBOX_GAME[2], BBOX_GAME[3]) / NUM_CELLS);	
    })
}


function setup() {
	/* Create the P5.js canvas */

	// CANVAS
    var canvas = createCanvas(CANVAS_WIDTH, CANVAS_WIDTH / 2);
    canvas.parent("canvas-container");
    
    // SLIDER
    slider_vision = createSlider(3, 16, 8);    
	slider_vision.parent("slider");
    slider_vision.mouseReleased(() => {
        VISION_MODE = slider_vision.value();
        SNAKE.vision_mode = VISION_MODE;
        SNAKE.update_full_vision();
    });
    
    // BUTTONS
    var button_start = createButton("New Game");
    button_start.mousePressed(() => {
        GAME.start();               // Init the game
        SNAKE = GAME.snakes[0];
        SNAKE.direction = "UP";     // No random initial direction when for the player
        IS_ALIVE = true;
        PAUSE = true;
        TRAIN = false;
        RUN_AI = false;
    });
    button_start.parent("buttons");

    var button_train = createButton("Train");
    button_train.mousePressed(() => {
        GAME.start();
        SNAKE = GAME.snakes[0]
        IS_ALIVE = true;
        PAUSE = false;
        TRAIN = !TRAIN;
    });
    button_train.parent("buttons");

    var button_train = createButton("Run AI");
    button_train.mousePressed(() => {
        GAME.start();
        SNAKE = GAME.snakes[0];
        SNAKE.vision_mode = 8;
        SNAKE.update_full_vision();
        SNAKE.neural_network.params = params_snake_1150;
        IS_ALIVE = true;
        PAUSE = false;
        TRAIN = false;
        RUN_AI = !RUN_AI;
    });
    button_train.parent("buttons");

    var button_train = createButton("Pause");
    button_train.mousePressed(() => {
        PAUSE = !PAUSE;
    });
    button_train.parent("buttons");
}


function resetCanvas() {
    /* Reset the game parameters */
    NUM_CELLS = slider_gameshape.value();
    CELL_SIZE = Math.floor(Math.max(BBOX_GAME[2], BBOX_GAME[3]) / NUM_CELLS);	
    // Optional
    // >>> Pad over all the canvas (Sometimes, if CELL_SIZE = floor(15.999), its better to add more cells to pad)
    while (((NUM_CELLS + 1) * CELL_SIZE < BBOX_GAME[2]) && (NUM_CELLS + 1) * CELL_SIZE < BBOX_GAME[3]) {
        NUM_CELLS++;
    }
    // Create the new game
    GAME = new Game(NUM_CELLS, NUM_CELLS);
    GAME.start();
    SNAKE = GAME.snakes[0];
}


function draw() {

    // Background
    background(255);
    draw_game(SHOW_GRID);
    draw_weights();
    draw_neurons();

    if (SHOW_VISION) {
        draw_vision()    
    } 
    if (!PAUSE) {
        if (TRAIN) {
            SNAKE.direction = SNAKE.next_direction();
            IS_ALIVE = SNAKE.move();
            // Restart a game if the snake died
            if (!IS_ALIVE) {
                GAME.start();
                SNAKE = GAME.snakes[0];
                IS_ALIVE = true;
                PAUSE = false;
            }
            // Speed of the training
            frameRate(20 * NUM_CELLS);
        }
        else if (RUN_AI) {
            IS_ALIVE = SNAKE.move();
            SNAKE.direction = SNAKE.next_direction();
            if (!IS_ALIVE) { 
                GAME.start();
                SNAKE = GAME.snakes[0];
                SNAKE.vision_mode = 8;
                SNAKE.update_full_vision();
                SNAKE.neural_network.params = params_snake_1150;
                IS_ALIVE = true;
                PAUSE = true;
            }
            // Default peed of the game
            frameRate(12);
        }
        else {
            IS_ALIVE = SNAKE.move();
            SNAKE.next_direction()     // Not necessary since in this case the player controll the snake, 
            if (!IS_ALIVE) {           // but update activation from the hidden layer
                GAME.start();
                SNAKE = GAME.snakes[0];
                SNAKE.direction = "UP";     // No random initial direction when for the player
                SNAKE.next_direction();
                IS_ALIVE = true;
                PAUSE = true;
            }
            // Default peed of the game
            frameRate(12);
        }

    }
}


function keyPressed() {
    if ((keyCode == LEFT_ARROW) && (SNAKE.direction != "RIGHT")) {
        SNAKE.direction = "LEFT";
        PAUSE = false;
    } 
    else if ((keyCode == RIGHT_ARROW) && (SNAKE.direction != "LEFT")) {
        SNAKE.direction = "RIGHT";
        PAUSE = false;
    }
    else if ((keyCode == UP_ARROW) && (SNAKE.direction != "DOWN")) {
        SNAKE.direction = "UP";
        PAUSE = false;
    }
    else if ((keyCode == DOWN_ARROW) && (SNAKE.direction != "UP")) {
        SNAKE.direction = "DOWN";
        PAUSE = false;
    }
}


function keyTyped() {
    if (key == 'v') {
        SHOW_VISION = !SHOW_VISION;
    } 
  }


// Disable Arrow Scrolling
// from: https://stackoverflow.com/questions/8916620/disable-arrow-key-scrolling-in-users-browser
window.addEventListener("keydown", function(e) {
    // space and arrow keys
    if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
}, false);