/*
 * File: snake.js
 * Creation: Sunday July 5th 2020
 * Author: Arthur Dujardin
 * Contact: arthur.dujardin@ensg.eu
 *          arthurd@ifi.uio.no
 * --------
 * Copyright (c) 2020 Arthur Dujardin
 */


// GLOBAL PARAMETERS
var LENGTH = 3;
var VISION_MODE = 8;
var VISION_TYPE = "distance";
var HIDDEN_LAYERS = [20, 12];
var PARAMS = -1;


class Snake {

    constructor(game, length, vision_mode, vision_type, hidden_layers) {
        // Main attributes
        this.game = game;
        this.length = length;
        this.body = this._init_body();
        // Direction
        this.direction = this._init_direction();
        this.bearing = 0;
        this.tail_direction = this.get_tail_direction();
        // Stats
        this.score = 0;
        this.lifespan = 0;
        // Vision Params
        this.vision_mode = vision_mode;
        this.vision_type = vision_type;
        // FullVision
        var head = this.body[this.body.length - 1];
        var angle = this.bearing;
        this.full_vision = new FullVision(this.game.grid, head, angle, vision_mode);
        // Neural Network
        this.hidden_layers = hidden_layers;
        this.layer_dimensions = [this.vision_mode * 3 + 4 * 2].concat(this.hidden_layers).concat([4]);
        this.neural_network = new NeuralNetwork(this.layer_dimensions);
        //this.params = this.nn.params;  
        this.compute_input();   
        this.next_direction();  
    }


    _get_bearing() {
        /* Get the bearing (from 0 to 360 */
        return Direction[this.direction];
    }


    _init_body() {
        var body = []
        // Tail position
        var mid_i = Math.floor(this.game.height / 2) + this.length - 1;
        var mid_j = Math.floor(this.game.height / 2);
        var snake_cell;
        // Body of the snake
        // Last element is its head
        for (let l = 0; l < this.length; l++) {
            var i = mid_i - l;
            var j = mid_j;
            snake_cell = new Cell(i, j, "SNAKE");
            body.push(snake_cell);
            this.game.grid.set_snake(i, j);
        }       
        return body;
    }


    _init_direction() {
        var head = this.body[this.body.length - 1];
        var surrounding_cells = [this.game.grid.getItem(head.i - 1, head.j),
                                 this.game.grid.getItem(head.i + 1, head.j),
                                 this.game.grid.getItem(head.i, head.j - 1),
                                 this.game.grid.getItem(head.i, head.j + 1)];
        
        // Init the direction where it can move next time
        var possible_cells = [];
        for (let c = 0; c < 4; c++) {
            var cell = surrounding_cells[c];
            if (cell.is_empty()) {
                possible_cells.push(cell);
            }
        }
        // Get the next cell where it CAN move
        var next_cell = possible_cells[randint(0, possible_cells.length)];
        var delta_i = head.i - next_cell.i;
        var delta_j = head.j - next_cell.j;
        // Init the direction toward this next cell
        if ((delta_i < 0) && (delta_j == 0)) {
            return "DOWN";
        }
        else if ((delta_i > 0) && (delta_j == 0)) {
            return "UP";
        }
        else if ((delta_j < 0) && (delta_i == 0)) {
            return "RIGHT";
        }
        else {
            return "LEFT";
        }
    }


    get_tail_direction() {
        var tail1 = this.body[0];
        var tail2 = this.body[1];
        var delta_i = tail1.i - tail2.i;
        var delta_j = tail1.j - tail2.j;
        if ((delta_i < 0) && (delta_j == 0)) {
            return "DOWN";
        }
        else if ((delta_i > 0) && (delta_j == 0)) {
            return "UP";
        }
        else if ((delta_j < 0) && (delta_i == 0)) {
            return "RIGHT";
        }
        else {
            return "LEFT";
        }
    }


            
    kill() {
        for (let c = 0; c < this.body.length; c++) {
            var cell = this.body[c];
            this.game.grid.set_empty(cell.i, cell.j);
        }
    }


    _next_move() {
        // Last element is the head
        var head = this.body[this.body.length - 1];
        // New coord
        var i;
        var j;
        // Switch / Case for all directions
        if (this.direction == "UP") {
            i = head.i - 1;
            j = head.j;
        }
        else if (this.direction == "LEFT") {
            i = head.i;
                j = head.j - 1;
        }  
        else if (this.direction == "DOWN") {
            i = head.i + 1;
            j = head.j;
        }  
        else if (this.direction == "RIGHT") {
            i = head.i; 
            j = head.j + 1;
        }       
        // Create the new head
        var new_head = new Cell(i, j, "SNAKE");
        return new_head;
    }


    update_full_vision() {
        var head = this.body[this.body.length - 1];
        this.full_vision = new FullVision(this.game.grid, head, this.bearing, this.vision_mode);
        this.hidden_layers = this.hidden_layers;
        this.layer_dimensions = [this.vision_mode * 3 + 4 * 2].concat(this.hidden_layers).concat([4]);
        this.neural_network = new NeuralNetwork(this.layer_dimensions);
        this.next_direction();
    }


    update() {
        var head = this.body[this.body.length - 1];
        this.full_vision.update(head, this.bearing);
        this.tail_direction = this.get_tail_direction();
    }


    compute_input() {
        // Set the input array for the neural network
        var X = nj.array([])
        // Binary vision
        if (this.vision_type == "binary") {
            for (let v = 0; v < this.full_vision.visions.length; v++) {
                var vision = this.full_vision.getItem(v);
                X = nj.concatenate(X, vision.to_binary());
            }
        }
        // Distance mode
        else {
            for (let v = 0; v < this.full_vision.visions.length; v++) {
                var vision = this.full_vision.getItem(v);
                X = nj.concatenate(X, vision.to_distances());
            }
        }
        // NORMALIZE !
        X = invertArray(X);
        // Add the one hot encoded direction vectors
        var one_hot_tail = one_hot_direction(this.tail_direction);
        X = nj.concatenate(X, one_hot_tail);
        // Idem for its direction
        var one_hot = one_hot_direction(this.direction);
        X = nj.concatenate(X, one_hot);
        return X.reshape(X.size, 1);
    }


    compute_output(X) {
        var Y_hat = this.neural_network.forward(X);
        return Y_hat;
    }


    next_direction() {
        var X = this.compute_input();
        var Y = this.compute_output(X),
        // Get the new direction by  the predicted class
        next_direction = Degree2Direction[argmax(Y) * 90];
        return next_direction;
    }


    move() {
        /* Move the snake and update the game. */ 
    
        var grid = this.game.grid;
        var new_head = this._next_move();
        // First, test if the move is valid
        if (grid.is_outside(new_head)) {
            // The snake died
            return false;
        }
        else if (grid.is_wall(new_head)) {
            // The snake died
            return false;
        }
        // Then test if it eat itthis
        else if (grid.is_snake(new_head)) {
            // The snake died
            return false;
        }
        // Test if it grows
        else if (grid.is_apple(new_head)) {
            // Update the body
            this.body.push(new_head);
            // Update the game / grid
            this.game.grid.set_cell(new_head); 
            this.game.add_apple();
            // Update the vision & state
            this.update();
            // Update the stats
            this.score += 1;
        }       
        // Move the snake
        else {
            // Update the body
            this.body.push(new_head);
            var previous_tail = this.body[0];
            this.body.shift();
            // Update the game
            grid.set_cell(new_head);
            grid.set_empty(previous_tail.i, previous_tail.j);
            // Update the vision & state
            this.update();
        }
        // Update its lifespan
        this.lifespan += 1;      

        return true;
    }

    
}   // End Snake