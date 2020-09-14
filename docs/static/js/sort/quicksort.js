/*
 * File: quicksort.js
 * Creation: Sunday July 5th 2020
 * Author: Arthur Dujardin
 * Contact: arthur.dujardin@ensg.eu
 *          arthurd@ifi.uio.no
 * --------
 * Copyright (c) 2020 Arthur Dujardin
 */


function quickSortAnim(array, run, isRunning) {
	const auxArray = [];
	for (let i = 0; i < array.length; i++) {
		auxArray.push(array[i]);
    }
    if (!isRunning) {
        quickSortInterval(auxArray, 0, auxArray.length - 1, animations);
    }

    run = !run;
    return run
}


function partition(items, left, right, animations) {
	var pivot = items[Math.floor((right + left) / 2)]; //middle element
	let piv = Math.floor((right + left) / 2);
	var i = left; //left pointer
	var j = right; //right pointer
    while (i <= j) {
        while (items[i] < pivot) {
            i++;
        }
        while (items[j] > pivot) {
            j--;
        }
        if (i <= j) {
			//animations.push([1, i, j, piv])
            //animations.push([2, i, j, piv])
            anim = new AnimationQuick("quick", 1, i, j, piv)
            animations.push(anim)
			swap(items, i, j); //swapping two elements
            i++;
            j--;
		}
    }
    return i;
}

function quickSortInterval(items, left, right, animations) {
    var index;
    if (items.length > 1) {
        index = partition(items, left, right, animations); //index returned from partition
        if (left < index - 1) { //more elements on the left side of the pivot
            quickSortInterval(items, left, index - 1, animations);
        }
        if (index < right) { //more elements on the right side of the pivot
            quickSortInterval(items, index, right, animations);
        }
    }
    return items;
}