/*
 * File: vision.js
 * Creation: Sunday July 5th 2020
 * Author: Arthur Dujardin
 * Contact: arthur.dujardin@ensg.eu
 *          arthurd@ifi.uio.no
 * --------
 * Copyright (c) 2020 Arthur Dujardin
 */


class Vision {

    constructor(grid, center, angle) {
        this.grid = grid;
        this.angle = angle;
        this.center = center;
        this.end_point = this._get_end_point();
        this.end_cell = this.grid.getItem(Math.floor(this.end_point[0]), Math.floor(this.end_point[1]));
        // Visible item from center
        this.visible_object = this.detect()[0];
        this.nearest_cells = this.detect();
    }


    _get_end_point() {
        /*
        Get the last point seen from the vision center.
        In other words, it will compute the point coordinates that intersect the grid borders.

        Returns
        -------
        end_point : tuple
            End point coordinates seen from center in the grid.
        */

        // Params
        var i = this.center.i;
        var j = this.center.j;
        var i_end;
        var j_end;
        var height = this.grid.height;
        var width = this.grid.width;
        var angle_rad = deg2rad(this.angle);  
        // Get the last point seen by vision
        var end_point;
        // Check the first quarter of the trigonometric circle
        if (this.angle == 0) {
            end_point = [0, j];
        }
        else if (this.angle < 90) {
            j_end = j - Math.tan(angle_rad) * (i)
            i_end = i - Math.tan(Math.PI / 2 - angle_rad) * (j)
            // Avoid issues with float numbers...
            i_end = Math.round((i_end + Number.EPSILON) * 1000000000000) / 1000000000000;
            j_end = Math.round((j_end + Number.EPSILON) * 1000000000000) / 1000000000000;
            // If i_end <= i - i0, 
            // it means that the ray will it the left side of the grid
            if ((0 <= i_end) && (i_end <= i)) {
                end_point = [i_end, 0];
            }   
            else {
                end_point = [0, j_end];
            }
        }
        // Second quarter
        else if (this.angle == 90) {
            end_point = [i, 0];
        }
        else if (this.angle < 180) {
            j_end = j - Math.tan(Math.PI - angle_rad) * (height - 1 - i);
            i_end = i + Math.tan(angle_rad - Math.PI / 2) * j;
            // Avoid issues with float numbers...
            i_end = Math.round((i_end + Number.EPSILON) * 1000000000000) / 1000000000000;
            j_end = Math.round((j_end + Number.EPSILON) * 1000000000000) / 1000000000000;
            if ((i <= i_end) && (i_end <= height - 1)) {
                end_point = [i_end, 0];
            }
            else {
                end_point = [height - 1, j_end];
            }
        }
        // Third quarter
        else if (this.angle == 180) {
            end_point = [height-1, j]
        }
        else if (this.angle < 270) {
            j_end = j + Math.tan(angle_rad - Math.PI) * (height - 1 - i);
            i_end = i + Math.tan(3 * Math.PI / 2 - angle_rad) * (width - 1 - j);
            // Avoid issues with float numbers...
            i_end = Math.round((i_end + Number.EPSILON) * 1000000000000) / 1000000000000;
            j_end = Math.round((j_end + Number.EPSILON) * 1000000000000) / 1000000000000;
            if ((i <= i_end) && (i_end <= height-1)) {
                end_point = [i_end, width - 1];
            }
            else {
                end_point = [height - 1, j_end];
            }
        }
        // Last quarter
        else if (this.angle == 270) {
            end_point = [i, width-1];
        }
        else {
            j_end = j + Math.tan(2 * Math.PI - angle_rad) * i
            i_end = i - Math.tan(angle_rad - 3 * Math.PI / 2) * (width - 1 -  j)
            // Avoid issues with float numbers...
            i_end = Math.round((i_end + Number.EPSILON) * 1000000000000) / 1000000000000;
            j_end = Math.round((j_end + Number.EPSILON) * 1000000000000) / 1000000000000;
            if ((0 <= i_end) && (i_end <= i)) {
                end_point = [i_end, width - 1];
            }
            else {
                end_point = [0, j_end];
            }
        }
        return end_point;        
    }


    look() {
        /* 
        Convert a 2D line (2 points) in pixel / cells
        https://en.wikipedia.org/wiki/Bresenham%27s_line_algorithm 
        */

        // Star and end points
        var start_i = this.center.i;
        var start_j = this.center.j;
        var end_i = Math.round(this.end_point[0]);       // end_point is float coordinates
        var end_j = Math.round(this.end_point[1]);       // get the grid-cell coordinates       
        // Know wich direction to draw the line
        var delta_i = Math.abs(end_i - start_i);
        var delta_j = Math.abs(end_j - start_j);   
        var sign_i = Math.sign(end_i - start_i);
        var sign_j = Math.sign(end_j - start_j);
        var err = delta_i - delta_j;
        // Collect the cells visible from the starting point
        var visible_cells = []       
        while ((start_i != end_i) || (start_j != end_j)) {
            var e2 = 2 * err;
            if (e2 >= - delta_j) {
                // overshot in the y direction
                err -= delta_j;
                start_i += sign_i ;             
                // cell = this.grid.getItem(start_i, start_j);
                // visible_cells.push(cell);
            }
            if (e2 <= delta_i) {
                // overshot in the x direction
                err += delta_i;
                start_j += sign_j;
                // cell = this.grid.getItem(start_i, start_j);
                // visible_cells.push(cell);
            }
            var cell = this.grid.getItem(start_i, start_j);
            visible_cells.push(cell);
        }
        return visible_cells;
    }


    detect() {
        var visible_cells = this.look();
        // Add the first visible cells for each category
        var nearest_cells = [];
        var has_seen_snake = false;
        var has_seen_wall = false;
        var has_seen_apple = false;
        for (let c = 0; c < visible_cells.length; c++) {
            var cell = visible_cells[c];
            // Does it see a wall for the first time ?
            if ((cell.is_wall()) && !has_seen_wall) {
                nearest_cells.push(cell);
                has_seen_wall = true;
            }
            else if ((cell.is_snake()) && !has_seen_snake) {
                nearest_cells.push(cell);
                has_seen_snake = true;
            }
            else if ((cell.is_apple()) && !has_seen_apple) {
                nearest_cells.push(cell);
                has_seen_apple = true;
            }
        }
        return nearest_cells;
    }


    to_binary() {
        /*  Binary encoded vision */

        // Num class = Number of items (empty cells are not taking into account)
        var num_class = Object.keys(Item).length - 1;   
        var binary_vision = nj.zeros(num_class);
        var visible_cells = this.detect();
        for (let c = 0; c < visible_cells.length; c++) {
            var cell = visible_cells[c];
            binary_vision.set(cell.value, 1);
        }
        return binary_vision;
    }


    to_distances() {
        /* Distance encoded vision */

        // Num class = Number of items (empty cells are not taking into account)
        var num_class = Object.keys(Item).length - 1;
        var distance_vision = nj.zeros(num_class);
        var visible_cells = this.detect();
        for (let c = 0; c < visible_cells.length; c++) {
            var cell = visible_cells[c];
            var distance = Math.sqrt(Math.pow(cell.i - this.center.i, 2) + Math.pow(cell.j - this.center.j, 2));
            distance_vision.set(cell.value, distance);
        }
        return distance_vision;
    }

}   // End Vision



class FullVision {

    constructor(grid, center, bearing, mode) {
        this.grid = grid;
        this.center = center;
        this.bearing = bearing;
        this.mode = mode;
        this.visions = this._init_visions();
    }

    _init_visions() {
        /* Create n_mode vision objects, with an equal angle theta from each other */

        var visions = [];
        var theta = 360 / this.mode;
        var angle = this.bearing;
        for (let i = 0; i < this.mode; i++) {
            var vision = new Vision(this.grid, this.center, angle);
            visions.push(vision);
            // Rotate the next vision
            angle += theta;
        }
        return visions;
    }


    update(center, bearing) {
        this.center = center;
        this.bearing = bearing;
        this.visions = this._init_visions();
    }


    getItem(index) {
        return this.visions[index];
    }
}   // End FullVision
