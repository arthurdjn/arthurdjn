/*
 * File: windraw.js
 * Creation: Sunday July 5th 2020
 * Author: Arthur Dujardin
 * Contact: arthur.dujardin@ensg.eu
 *          arthurd@ifi.uio.no
 * --------
 * Copyright (c) 2020 Arthur Dujardin
 */


const COLOR_PALETTE =  {"background":    [37, 54, 69],
                        "empty":         [37, 54, 69],
                        "wall":          [32, 44, 55],
                        "snake":         [46, 142, 212],
                        "snake_head":    [46, 142, 212],
                        "apple":         [227, 68, 52],
                        "neuron":        [255, 255, 255],
                        "weight_pos":    [37, 117, 52],
                        "weight_neg":    [227, 68, 52],
                        "visible_snake": [44, 112, 155],
                        "visible_apple": [255, 0, 0],
                        "visible_wall":  [19, 28, 35],
                        "vision":        [102, 119, 132],
                        "vision_apple":  [255, 0, 0],
                        "vision_snake":  [255, 0, 0]};
var SHOW_GRID = true;
var SHOW_VISION = false;



function draw_vision()  {
    var j0 = BBOX_GAME[0];
    var i0 = BBOX_NETWORK[1];
    // Draw the vision for all snakes
    for (let s = 0; s < GAME.snakes.length; s++) {
        var snake = GAME.snakes[s];
        for (let v = 0; v < snake.full_vision.visions.length; v++) {
            var vision = snake.full_vision.getItem(v);
            
            // Draw the visible_object
            let i = vision.visible_object.i;
            let j = vision.visible_object.j;
            if (vision.visible_object.item == "APPLE") {
                var color_object = COLOR_PALETTE["visible_apple"];
            }
            if (vision.visible_object.item == "SNAKE") {
                var color_object = COLOR_PALETTE["visible_snake"];
            }
            else {
                var color_object = COLOR_PALETTE["visible_wall"];
            }
            fill(color_object);
            noStroke();
            rect(j0 + j * CELL_SIZE, i0 + i * CELL_SIZE, CELL_SIZE, CELL_SIZE);
            
            // Set the vision's color regarding the visible object
            var color_vision = COLOR_PALETTE['vision'];
            if (vision.visible_object.item == "APPLE") {
                var color_vision = COLOR_PALETTE["vision_apple"];
            }
            else if (vision.visible_object.item == "SNAKE") {
                var color_vision = COLOR_PALETTE["vision_snake"];
            }

            // Draw a line from the center to the last object (usually wall)
            var center = vision.center;
            var end_point = vision.end_point;
            var x0 = j0 + (center.j + .5) * CELL_SIZE;
            var y0 = i0 + (center.i + .5) * CELL_SIZE;
            var x1 = j0 + (end_point[1] +.5) * CELL_SIZE;
            var y1 = i0 + (end_point[0] + .5) * CELL_SIZE;
            stroke(color_vision);
            line(x0, y0, x1, y1);
        }
    }
}


function draw_game(show_grid) {
    // Get the parameters
    var grid = GAME.grid;
    var height = grid.height;
    var width = grid.width;
    var j0 = BBOX_GAME[0];
    var i0 = BBOX_NETWORK[1];
    
    // Draw the grid
    for (let i = 0; i < height; i++) {
        for (let j = 0; j < width; j++) {
            // Draw the background
            var color_cell = COLOR_PALETTE['empty'];
            if (show_grid && ((i +j) % 2 == 1)) {
                color_cell = COLOR_PALETTE['wall'];
            }
            // Draw the walls
            if (grid.getItem(i, j).is_wall()) {
                color_cell = COLOR_PALETTE['wall'];
            }
            // Draw the snake(s)
            else if (grid.getItem(i, j).is_snake()) {
                color_cell = COLOR_PALETTE['snake'];
            }
            // Draw the apple(s)
            else if (grid.getItem(i, j).is_apple()) {
                color_cell = COLOR_PALETTE['apple'];
            }
            fill(color_cell);
            noStroke();
            rect(j0 + j * CELL_SIZE, i0 + i * CELL_SIZE, CELL_SIZE, CELL_SIZE);
        }
    }
    // Draw the snake(s) head
    for (let s = 0; s < GAME.snakes.length; s++) {
        var snake = GAME.snakes[s];
        var i = snake.body[snake.body.length - 1].i;
        var j = snake.body[snake.body.length - 1].j;
        color_cell = COLOR_PALETTE['snake_head'];
        fill(color_cell);
        noStroke();
        rect(j0 + j * CELL_SIZE, i0 + i * CELL_SIZE, CELL_SIZE, CELL_SIZE);
    }
}




function draw_neurons() {
    // Origin on where to draw the network
    var j0 = BBOX_NETWORK[0];
    var i0 = BBOX_NETWORK[1];
    var width = BBOX_NETWORK[2];
    var height = BBOX_NETWORK[3];
    var color_neuron = COLOR_PALETTE["neuron"];
    // Neural Network
    var layer_dimensions = SNAKE.layer_dimensions;
    var num_layers = layer_dimensions.length;
    var max_neurons = max(layer_dimensions);
    // Layers margin
    var layer_spacing = Math.floor(width / num_layers);
    var padding = 20;
    var neuron_spacing = Math.floor((height - 2 * padding) / max_neurons);
    var neuron_radius = Math.floor(neuron_spacing / 2 * 0.6);
    // Margin from one layer to the next one
    var j = j0 + Math.floor(layer_spacing / 2);
    for (let num_layer = 0; num_layer < layer_dimensions.length; num_layer++) {
        var layer = layer_dimensions[num_layer];
        // Center the neurons y-axis
        var margin_top = Math.floor(neuron_spacing * (max_neurons - layer + 1.5) / 2) + Math.floor(padding);
        A = SNAKE.neural_network.params['A_' + num_layer.toString()];
        A = A.divide(Math.max(maxArray(A), 1));
        for (let i = 0; i < layer; i++) {
            // Draw the neurons regarding its activation
            color_activation = [color_neuron[0] * A.get(i, 0), color_neuron[1] * A.get(i, 0), color_neuron[1] * A.get(i, 0)]
            fill(color_activation);
            smooth()
            stroke(0)
            circle(j, margin_top + i0 + i * neuron_spacing, 2 * neuron_radius);
        } 
        // Switch to another layer
        j = j + layer_spacing;
    }    
}




    
function draw_weights() {
    // Origin on where to draw the network
    var j0 = BBOX_NETWORK[0];
    var i0 = BBOX_NETWORK[1];
    var width = BBOX_NETWORK[2];
    var height = BBOX_NETWORK[3];   
    // Neural Network
    var layer_dimensions = SNAKE.layer_dimensions;
    var num_layers = layer_dimensions.length;
    var max_neurons = max(layer_dimensions);
    // Layers margin
    var layer_margin = Math.floor(width / num_layers);
    var padding = 20;
    var neuron_spacing = Math.floor((height - 2 * padding) / max_neurons);
    // Margin from one layer to the next one
    var layer_spacing = j0 + Math.floor(layer_margin / 2);
    for (let num_layer = 0; num_layer < layer_dimensions.length - 1; num_layer++) {
        var layer = layer_dimensions[num_layer];
        // Get the dimension of the layers
        var layer_start = layer_dimensions[num_layer]
        var layer_end = layer_dimensions[num_layer + 1]
        // Center the neurons y-axis
        var margin_top_start = Math.floor(neuron_spacing * (max_neurons - layer_start + 1.5) / 2) + Math.floor(padding);
        var margin_top_end = Math.floor(neuron_spacing * (max_neurons - layer_end + 1.5) / 2) + Math.floor(padding);
        // Get the weights / shape
        var W = SNAKE.neural_network.params['W_' + (num_layer + 1).toString()];
        var N = W.shape[0];
        var M = W.shape[1];
        // Draw a line for each weights
        for (let i = 0; i < N; i++) {
            for (let j = 0; j < M; j++) {
                var start_x = layer_spacing;
                var start_y = margin_top_start + i0 + i * neuron_spacing;
                var end_x = layer_spacing + layer_margin
                var end_y = margin_top_end + j0 + j * neuron_spacing;
                // Different colors regarding weight sign
                var color_weight = COLOR_PALETTE["weight_pos"] 
                if (W.get(i, j) < 0) {
                    color_weight = COLOR_PALETTE["weight_neg"]
                }
                // Draw the neurons connection from layer_start to layer_end
                stroke(color_weight);
                line(start_x, start_y, end_x, end_y);
            }
        }
        // Move to another set of layers
        layer_spacing += layer_margin;
    }
}

