/*
 * File: game.js
 * Creation: Sunday July 5th 2020
 * Author: Arthur Dujardin
 * Contact: arthur.dujardin@ensg.eu
 *          arthurd@ifi.uio.no
 * --------
 * Copyright (c) 2020 Arthur Dujardin
 */


class Game {

    constructor(height, width) {
        var grid = new Grid(height, width)
        grid.add_wall_borders();
        this.grid = grid;
        this.height = height;
        this.width = width;
        this.snakes = [];
        this.apples = [];
    }

    add_snake() {
        var snake = new Snake(this, LENGTH, VISION_MODE, VISION_TYPE, HIDDEN_LAYERS)
        this.snakes.push(snake);
        // for (s = 0; s < snake.body.length; s++) {
        //     this.grid.set_cell(s);
        // }
    }

    add_apple() {
        var apple = this.generate_apple();
        this.apples.push(apple);
        this.grid.set_cell(apple);
    }

    generate_apple() {
        // Check the available cells
        var available_coords = [];
        for (let i = 0; i < this.height; i++) {
            for (let j = 0; j < this.width; j++) {
                var cell = this.grid.getItem(i, j);
                // If the cell is empty, add it to the available cells list
                if (cell.is_empty()) {
                    available_coords.push([cell.i, cell.j]);
                }
            }
        }
        // Choose a position among all
        var c = randint(0, available_coords.length);
        var coord = available_coords[c];
        var apple = new Cell(coord[0], coord[1], "APPLE");

        return apple;
    }


    clean() {
        // Kill the snake(s)
        for (let s = 0; s < this.snakes.length; s++) {
            this.snakes[s].kill();
        }
        this.snakes = [];
        // Delete all apples
        for (let a = 0; a < this.apples.length; a++) {
            var apple = this.apples[a];
            this.grid.set_empty(apple.i, apple.j);
        }
        this.apples = [];
    }


    start() {
        this.clean();
        this.add_snake();
        this.add_apple();
        this.snakes[this.snakes.length - 1].update();
    }


}   // End Game
