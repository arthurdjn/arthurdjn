/*
 * File: utils.js
 * Creation: Sunday July 5th 2020
 * Author: Arthur Dujardin
 * Contact: arthur.dujardin@ensg.eu
 *          arthurd@ifi.uio.no
 * --------
 * Copyright (c) 2020 Arthur Dujardin
 */


/*  
    All auxiliary functions used
*/

function swap(arr, a, b) {
    /*
        *** Swap to values at different indeces a and b of an array ***
    */
   
	let temp = arr[a];
	arr[a] = arr[b];
	arr[b] = temp;
}

function insert(array, index, element) {
    /*
        *** Change the position of an element of an array by pushing the values of the array ***
            Ex :    array = [4, 5, 6, 7, 8, 9]
                    index = 1
                    element = 8
                    insert(array, index, element)
                    array
                    >>> [4, 8, 5, 6, 7, 9]
    */

    let idx = array.indexOf(element);

    if (index < idx) {
		let temp = array[index];
		array[index] = element;
        for (let i = index + 1; i < idx + 1; i++) {
            let temp2 = array[i];
            array[i] = temp;
            temp = temp2;
        }
    }
    else {
        for (let i = idx; i < index; i++) {
            array[i] = array[i + 1];
		}
		array[index] = element;
    }
}





