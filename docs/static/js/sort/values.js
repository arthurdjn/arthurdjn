/*
 * File: values.js
 * Creation: Sunday July 5th 2020
 * Author: Arthur Dujardin
 * Contact: arthur.dujardin@ensg.eu
 *          arthurd@ifi.uio.no
 * --------
 * Copyright (c) 2020 Arthur Dujardin
 */


/*
    This class defines the values (ie bars) for the sorting algorithms
*/

class Bars {
    constructor(nb_bars, max_height, bar_width, bar_margin) {
        // The bars depends on their number, width, margin, max_height
        // There are no values by default (empty list)
        this.nb_bars = nb_bars;             // Integer
        this.max_height = max_height;       // Float
        this.bar_margin = bar_margin;       // Integer (pixels)
        this.bar_width = bar_width;         // Integer (pixels)
        this.values = [];                   // Array

        // Default Colors
        this.primeColor = '#00adb5';
        this.secondColor = '#79228f';
        this.thirdColor = '#50a15e';
        this.fourthColor = '#c93208';
    }

    init() {
        // Function to initialize the values
        // Each bars have a height between 0 to max_height
        for (let i = 0; i < this.nb_bars; i++) {
            this.values.push(random(this.max_height - 3) + 3);
        }
    }

    // Setting the colors
    setPrimeColor(color) {
        this.primeColor = color;
    }
    setSecondColor(color) {
        this.secondColor = color;
    }
    setThirdColor(color) {
        this.thirdColor = color;
    }
    setFourthColor(color) {
        this.fourthColor = color;
    }
}