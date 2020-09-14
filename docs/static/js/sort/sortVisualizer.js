/*
 * File: sortVisualizer.js
 * Creation: Sunday July 5th 2020
 * Author: Arthur Dujardin
 * Contact: arthur.dujardin@ensg.eu
 *          arthurd@ifi.uio.no
 * --------
 * Copyright (c) 2020 Arthur Dujardin
 */


/*
 *	This script creates a canvas and simulates the sorting algorithm
 *
 *
 *	TO DO : Change the global variables BAR etc. Delete them as they are saved in the bars variable. Keep updated the bars, not BARS_WIDTH and so on.
 *			In draw(), BAR_WIDTH are called. It should be bars.bar_width instead.
*/


// Global Variables (palette, size etc.)
const CANVAS_BACKGROUND_COLOR2 = '#222831';
const CANVAS_BACKGROUND_COLOR = '#1a1e24';
const BAR_COLOR_PRIMARY = '#34b9bf';
const BAR_COLOR_SECONDARY = '#eeeeee';
const BAR_COLOR_TERTIARY = '#393e46';
const BAR_COLOR_QUATERNARY = '#393e46';

var WIDTH = $(window).width();
var HEIGHT = $(window).height();

var BAR_WIDTH = 40;
var BAR_MARGIN = 2;
var CANVAS_WIDTH = Math.floor(WIDTH*0.77);
var CANVAS_HEIGHT = Math.floor(HEIGHT*0.6);
var NUMBER_OF_BARS = Math.floor(CANVAS_WIDTH/(BAR_WIDTH + BAR_MARGIN));

// Keep the global variables updated if the user resize the screen
resizeWindow();

// Global value of the slider
var slider;

// Simulation variables (Bars Object, array of animations to play, if the simulation is running or paused  etc.)
// These variables need to be global for the draw function
let bars;
let animations = []

// isRunning keep track if the simulation is running and has been paused. If so, when the user click again on a sort button, only 
// the simulation is played the sorting algorithm are not called
let isRunning = false;
// Tell if the simulation is played or not
let run = false;

// Keep track of the simulation steps
// Each steps are an index of an animation in animations
let step = 0;



function setup() {
	/*
		*** Create the Canvas ***
			Need P5.js to works
	*/

	// Creating the canvas
    var canvas = createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
	canvas.parent("canvas-container");
	
	// BUTTONS
	// Creating a button to generate new arrays
    var buttonNew = createButton("Generate New Array");
	buttonNew.mousePressed(resetSketch);
	buttonNew.parent("buttons");

	// SLIDER
	// Create a slider to change the width of the bars
	slider = createSlider(2, 140, 10);
	slider.parent("slider");
	slider.mouseReleased(resetSketch);

	// Creating a button to sort the array using the Bubble Sort algorithm
    var buttonBubbleSort = createButton("Bubble Sort");
	buttonBubbleSort.mousePressed(() => {
		run = bubbleSortAnim(values, run, isRunning)
		isRunning = true;
	});
	buttonBubbleSort.parent("buttons");
	// Creating a button to sort the array using the Quick Sort algorithm
	var buttonQuickSort = createButton("Quick Sort");
	buttonQuickSort.mousePressed(() => {
		run = quickSortAnim(values, run, isRunning)
		isRunning = true;
	});
	buttonQuickSort.parent("buttons");
	// Creating a button to sort the array using the Merge Sort algorithm
	var buttonMergeSort = createButton("Merge Sort");
	buttonMergeSort.mousePressed(() => {
		run = mergeSortAnim(values, animations, run, isRunning)
		isRunning = true;
	});
	buttonMergeSort.parent("buttons");
	// Creating a button to sort the array using the Merge Sort algorithm
	var buttonMergeSort = createButton("Heap Sort");
	buttonMergeSort.mousePressed(() => {
		run = mergeSortAnim(values, animations, run, isRunning)
		isRunning = true;
	});
	buttonMergeSort.parent("buttons");

	// Changing the style of the bars
	var buttonColor = createButton("Color");
	buttonColor.mousePressed(color);
	buttonColor.parent("buttons");

	// Initializing the array/values
	resetSketch();
}


function resetSketch() {
	/*
		*** Reset the simulation and create a new array/values ***
	*/

	// Create new bars depending on the : 
	//										- number of bars
	//										- canvas' height
	//										- bar's width
	//										- bar's margin
	BAR_WIDTH = slider.value();
	NUMBER_OF_BARS = Math.floor(CANVAS_WIDTH/(BAR_WIDTH + BAR_MARGIN));

	bars = new Bars(NUMBER_OF_BARS, CANVAS_HEIGHT, BAR_WIDTH, BAR_MARGIN);
	bars.init();
	bars.setPrimeColor(BAR_COLOR_PRIMARY);
	bars.setSecondColor(BAR_COLOR_SECONDARY);
	bars.setThirdColor(BAR_COLOR_TERTIARY);
	bars.setFourthColor(BAR_COLOR_QUATERNARY);
	values = bars.values;

	// Reset the animations to an empty array (no animations)
	animations = []

	// Stop the simulation
	run = false;
	isRunning = false;

	// Reset the step state of the simulation down to 0
	step = 0;
}


function drawSort() {
	/*
		*** Draw the bars depending on their state ***
			Create the visuals of the algorithm
	*/

	// If all animations have not already be played, continue to play the simulation
	if (step < animations.length) {
		// Collecting the object animation from the list of all animations to play
		const anim = animations[step];
		anim.draw(bars, false);
		step++;
	}
	// If all animations have been played, stop the simulation and remove the past animations
	else {
		step = 0;
		run = false;
		isRunning = false;
		animations = [];
	}
}


function draw() {
	/*
		*** Draw on the canvas ***
			P5.js function
	*/
	// Background color
	background(CANVAS_BACKGROUND_COLOR);
	for (let i = 0; i < values.length; i++) {
		stroke(BAR_COLOR_PRIMARY);
		strokeCap(SQUARE);
		strokeWeight(BAR_WIDTH);
		line(i*(BAR_WIDTH + BAR_MARGIN) + 2*BAR_MARGIN, height /2+ values[i]/2, i*(BAR_WIDTH + BAR_MARGIN) + 2*BAR_MARGIN, height/2 - values[i]/2);
	}

	// If the simulation is running
	if (run) {
		drawSort();
	}
	// If the animation is paused
	if (!run && step < animations.length) {
		const anim = animations[step];
		anim.draw(bars, true);
	}

	// Speed of the simulation
	frameRate(60/slider.value()*2);
}



function resizeWindow() {
	/*
		*** Update the canvas dimensions if the document page has been resized ***
			If the page is resized, then a new array / bar object is created to match the new screen dimensions
	*/
	window.addEventListener("resize", function(event) {
		WIDTH = $(window).width();
		HEIGHT = $(window).height();
		CANVAS_WIDTH = Math.floor(WIDTH*0.77);
		CANVAS_HEIGHT = Math.floor(HEIGHT*0.6);
		NUMBER_OF_BARS = Math.floor(CANVAS_WIDTH/(BAR_WIDTH + BAR_MARGIN));
		resizeCanvas(CANVAS_WIDTH, CANVAS_HEIGHT)
		resetSketch();
	})
}



