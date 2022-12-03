/*
 * File: bubblesort.js
 * Creation: Sunday July 5th 2020
 * Author: Arthur Dujardin
 * Contact: arthur.dujardin@ensg.eu
 *          arthurd@ifi.uio.no
 * --------
 * Copyright (c) 2020 Arthur Dujardin
 */


function bubbleSortAnim(array, run, isRunning) {
	const auxArray = [];
	for (let i = 0; i < array.length; i++) {
		auxArray.push(array[i]);
	}

	if (!isRunning) {
		bubbleSort(auxArray, animations)
	}
	run = !run;
	return run
}



function bubbleSort(array, animations) {
	const slow = array.length < 15;
    for (let j = 0; j < array.length; j++) {
		if (slow) {
			for (let i = 0; i < array.length - j - 1; i++) {
				if (array[i] > array[i+1]) {
					anim = new AnimationBubble("bubble", 1, i, i+1, slow);
					animations.push(anim);
					anim = new AnimationBubble("bubble", 2, i, i+1, slow);
					animations.push(anim);
					swap(array, i, i+1);
					maxIdx = i;
				}
				else {
					anim = new AnimationBubble("bubble", 0, i, i+1, slow);
					animations.push(anim);
				}
			}
		}
		else {
			let maxIdx = 0;
			for (let i = 0; i < array.length - j; i++) {
				if (array[i] > array[maxIdx]) {
					maxIdx = i;
				}
			}
			anim = new AnimationBubble("bubble", 1, array.length - 1 - j, maxIdx, slow);
			animations.push(anim);
			insert(array, array.length - 1 - j, array[maxIdx])
		}
	}
}
