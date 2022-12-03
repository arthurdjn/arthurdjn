/*
 * File: animation.js
 * Creation: Sunday July 5th 2020
 * Author: Arthur Dujardin
 * Contact: arthur.dujardin@ensg.eu
 *          arthurd@ifi.uio.no
 * --------
 * Copyright (c) 2020 Arthur Dujardin
 */


/*
 * This class concerns the animation for the different algorithms
 * Algorithms have different types of animations
 */

// Parent class
class Animations {
    constructor(type, move) {
        // Type concerns the algorithm/animation type
        this.type = type;   // String
        this.move = move;   // Integer
    }
}

// Children classes
class AnimationMerge extends Animations {
    constructor(type, move, firstIdx, insertedValue) {
        super(type, move);
        this.firstIdx = firstIdx;
        this.insertedValue = insertedValue;
    }

    draw(bars, paused) {
        /*
         * Draw the animation for the Merge Sort algorithm
         *    
         * param bars:     bars object to draw on
         * type bars:      Bars
         * param paused:   tells if the simulation is paused. If the simulation is paused, 
         *                 paint the state of the animation but do not animate it
         * type paused:    boolean
        */

        // Parameters to draw
		let bar_width = bars.bar_width;
		let bar_margin = bars.bar_margin;
        let height = bars.max_height;
        let values = bars.values;
		strokeCap(SQUARE);
        strokeWeight(bar_width);
        
        let i = this.firstIdx;
        let j = this.insertedValue;
        let move = this.move;
        if (move == 1) {
            // If the value we are comparing are different, then swap them and highlights them with the second color
            stroke(bars.secondColor);
            line(i*(bar_width + bar_margin) + 2*bar_margin, height/2+ values[i]/2, i*(bar_width + bar_margin) + 2*bar_margin, height/2 - values[i]/2);
            line(values.indexOf(j)*(bar_width + bar_margin) + 2*bar_margin, height/2+ j/2, values.indexOf(j)*(bar_width + bar_margin) + 2*bar_margin, height/2 - j/2);
            // Update the array of the movement
            if (!paused) {
                insert(values, i, j)
            }
        }
        else if (move == 2) {
            // If slow, highlight when only on value is compared to itself
            stroke(bars.thirdColor);
            line(i*(bar_width + bar_margin) + 2*bar_margin, height/2+ values[i]/2, i*(bar_width + bar_margin) + 2*bar_margin, height/2 - values[i]/2);
            line(values.indexOf(j)*(bar_width + bar_margin) + 2*bar_margin, height/2+ j/2, values.indexOf(j)*(bar_width + bar_margin) + 2*bar_margin, height/2 - j/2);
            if (!paused) {
                insert(values, i, j)
            }
        }
        else if (move == 3) {
            // Only for slow movement
            // See the change after a swap, highlight the two values with the second color
            stroke(bars.secondColor);
            line(i*(bar_width + bar_margin) + 2*bar_margin, height/2+ values[i]/2, i*(bar_width + bar_margin) + 2*bar_margin, height/2 - values[i]/2);
            line(j*(bar_width + bar_margin) + 2*bar_margin, height/2+ values[j]/2, j*(bar_width + bar_margin) + 2*bar_margin, height/2 - values[j]/2);
        }
        else{
            // If there are nothing specific (values already sorted), then higlights them in third color
            stroke(bars.thirdColor);
            line(i*(bar_width + bar_margin) + 2*bar_margin, height/2+ values[i]/2, i*(bar_width + bar_margin) + 2*bar_margin, height/2 - values[i]/2);
            line(values.indexOf(j)*(bar_width + bar_margin) + 2*bar_margin, height/2+ j/2, values.indexOf(j)*(bar_width + bar_margin) + 2*bar_margin, height/2 - j/2);
        }
		
    }
}

class AnimationBubble extends Animations {
    constructor(type, move, firstIdx, secondIdx, slow) {
        super(type, move);
        this.firstIdx = firstIdx;
        this.secondIdx = secondIdx;
        this.slow = slow;
    }

    draw(bars, paused) {
        // Parameters to draw
		let bar_width = bars.bar_width;
		let bar_margin = bars.bar_margin;
        let height = bars.max_height;
        let values = bars.values;
		strokeCap(SQUARE);
        strokeWeight(bar_width);

        let i = this.firstIdx;
        let j = this.secondIdx;
        let move = this.move;
        if (this.slow) {
            if (move == 1) {
                stroke(bars.secondColor);
                line(i*(bar_width + bar_margin) + 2*bar_margin, height/2+ values[i]/2, i*(bar_width + bar_margin) + 2*bar_margin, height/2 - values[i]/2);
                line(j*(bar_width + bar_margin) + 2*bar_margin, height/2+ values[j]/2, j*(bar_width + bar_margin) + 2*bar_margin, height/2 - values[j]/2);
                if (!paused) {
                    swap(values, i, j)
                }
            }
            else if (move == 2) {
                stroke(bars.secondColor);
                line(i*(bar_width + bar_margin) + 2*bar_margin, height/2+ values[i]/2, i*(bar_width + bar_margin) + 2*bar_margin, height/2 - values[i]/2);
                line(j*(bar_width + bar_margin) + 2*bar_margin, height/2+ values[j]/2, j*(bar_width + bar_margin) + 2*bar_margin, height/2 - values[j]/2);
            }
            else {
                stroke(bars.thirdColor);
                line(i*(bar_width + bar_margin) + 2*bar_margin, height/2+ values[i]/2, i*(bar_width + bar_margin) + 2*bar_margin, height/2 - values[i]/2);
                line(j*(bar_width + bar_margin) + 2*bar_margin, height/2+ values[j]/2, j*(bar_width + bar_margin) + 2*bar_margin, height/2 - values[j]/2);
            }
        }
        else {
            if (move == 1) {
                stroke(bars.thirdColor);
                line(i*(bar_width + bar_margin) + 2*bar_margin, height/2+ values[i]/2, i*(bar_width + bar_margin) + 2*bar_margin, height/2 - values[i]/2);
                stroke(bars.secondColor);
                line(j*(bar_width + bar_margin) + 2*bar_margin, height/2+ values[j]/2, j*(bar_width + bar_margin) + 2*bar_margin, height/2 - values[j]/2);
                if (!paused) {
                    insert(values, i, values[j]);
                }
            }
        }
    }
}

class AnimationQuick extends Animations {
    constructor(type, move, firstIdx, secondIdx, pivot) {
        super(type, move);
        this.firstIdx = firstIdx;
        this.secondIdx = secondIdx;
        this.pivot = pivot;
    }

    draw(bars, paused) {
        // Parameters to draw
		let bar_width = bars.bar_width;
		let bar_margin = bars.bar_margin;
        let height = bars.max_height;
        let values = bars.values;
		strokeCap(SQUARE);
        strokeWeight(bar_width);

        let i = this.firstIdx;
        let j = this.secondIdx;
        let move = this.move;
        let pivot = this.pivot;
        if (move == 1) {
            stroke(bars.secondColor);
            line(i*(bar_width + bar_margin) + 2*bar_margin, height/2+ values[i]/2, i*(bar_width + bar_margin) + 2*bar_margin, height/2 - values[i]/2);
            line(j*(bar_width + bar_margin) + 2*bar_margin, height/2+ values[j]/2, j*(bar_width + bar_margin) + 2*bar_margin, height/2 - values[j]/2);
            stroke(bars.thirdColor);
            line(pivot*(bar_width + bar_margin) + 2*bar_margin, height/2+ values[pivot]/2, pivot*(bar_width + bar_margin) + 2*bar_margin, height/2 - values[pivot]/2);
            if (!paused) {
                swap(values, i, j)
            }
        }
        
    }
}
