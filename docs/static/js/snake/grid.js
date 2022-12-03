/*
 * File: grid.js
 * Creation: Sunday July 5th 2020
 * Author: Arthur Dujardin
 * Contact: arthur.dujardin@ensg.eu
 *          arthurd@ifi.uio.no
 * --------
 * Copyright (c) 2020 Arthur Dujardin
 */


class Cell {
    /* Define a game cell */

    constructor(i, j, item) {
        this.i = i;
        this.j = j;
        this.item = item;
        this.value = Item[item];
    }

    is_wall() {
        return this.item == "WALL";
    }
    is_empty() {
        return this.item == "EMPTY";
    }
    is_snake() {
        return this.item == "SNAKE";
    }
    is_apple() {
        return this.item == "APPLE";
    }
}
    

class Grid {
    /* Define a grid composed by cells */

    constructor(height, width) {
        this.shape = [height, width];
        this.height = height;
        this.width = width;
        this.values = this._init_grid("EMPTY");
    }

    _init_grid(fill_value) {
        // Get the height and width from the shape
        var height = this.height;
        var width = this.width;
        // Create the grid
        var values = [];
        for (let i = 0; i < height; i++) {
            var row = [];
            for (let j = 0; j < width; j++) {
                // Create an empty cell
                var cell = new Cell(i, j, fill_value)
                row.push(cell);
            }
            values.push(row)
        }
        return values;
    }

    add_wall_borders() {
        var height = this.height;
        var width =  this.width;
        for (let i = 0; i < height; i++) {
            for (let j = 0; j < width; j++) {
                if ((i == 0) || (i == height - 1)) {
                    this.values[i][j] = new Cell(i, j, "WALL");
                }
                else if ((j == 0) || (j == width - 1)) {
                    this.values[i][j] = new Cell(i, j, "WALL");
                }
            }
        }
    }

    // Shortcuts to set / get an element from the grid
    set(i, j, item) {
        this.values[i][j] = new Cell(i, j, item)
    }
    set_wall(i, j) {
        this.values[i][j] = new Cell(i, j, "WALL")
    }
    set_empty(i, j) {
        this.values[i][j] = new Cell(i, j, "EMPTY")
    }
    set_snake(i, j) {
        this.values[i][j] = new Cell(i, j, "SNAKE")
    }
    set_apple(i, j) {
        this.values[i][j] = new Cell(i, j, "APPLE")
    }
    set_cell(cell) {
        this.values[cell.i][cell.j] = cell;
    }

    // Check type of cell
    is_wall(cell) {
        var grid_cell = this.values[cell.i][cell.j];
        return grid_cell.is_wall();
    }
    is_empty(cell) {
        var grid_cell = this.values[cell.i][cell.j];
        return grid_cell.is_empty();
    }
    is_snake(cell) {
        var grid_cell = this.values[cell.i][cell.j];
        return grid_cell.is_snake();
    }
    is_apple(cell) {
        var grid_cell = this.values[cell.i][cell.j];
        return grid_cell.is_apple();
    }
    is_outside(cell) {
        /* Check if a cell is outside the grid. */

        // Get the indices and shape
        var height = this.height;
        var width = this.width;
        var i = cell.i;
        var j = cell.i;
        // Check the i, jinates
        if ((i < 0) || (j < 0) || (i >= height) || (j >= width)) {
            return true;
        }
        return false;
    }

    // Custom methods to make life easier
    getItem(i, j) {
        return this.values[i][j];
    }

    toString() {
        var height = this.height;
        var width = this.width;
        var grid = "";
        for (let i = 0; i < height; i++) {
            var row = "\n";
            for (let j = 0; j < width; j++) {
                if (this.getItem(i, j).is_wall()) {
                    row += "##";
                }
                else if (this.getItem(i, j).is_empty()) {
                    row +=  "  ";
                }
                else if (this.getItem(i, j).is_snake()) {
                    row +=  "[]";
                }
                else if (this.getItem(i, j).is_apple()) {
                    row +=  " *";
                }
            }
            grid += row;
        }
        return grid;
    }


} // End Grid
        
