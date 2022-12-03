/*
 * File: mergesort.js
 * Creation: Sunday July 5th 2020
 * Author: Arthur Dujardin
 * Contact: arthur.dujardin@ensg.eu
 *          arthurd@ifi.uio.no
 * --------
 * Copyright (c) 2020 Arthur Dujardin
 */


/*  
 * This script sort an array using the merge sort algorithm
 */


function mergeSortAnim(array, animations, run, isRunning) {
    /*
        *** Launch the simulation and modify the animation list ***
            Function called by the event MousePressed

        param array:        array of all values to sort
        type array:         Array[float]
        param animations:   array to track the state of the process. All swap/insertion are stacked in this array
                            so it is possible to replay the algorithm step by step
        type animations:    Array[Animations]
    */

    // Creating an auxilairy array to not modify the original array
    let mainArray = [];
    for (let i = 0; i < array.length; i++) {
        mainArray.push(array[i]);
    }
   
    // Sort the array and keep track of the animations (steps)  
    if (!isRunning) {
        mergeSort(mainArray, 0, array.length - 1, animations);
    }
    // Start the simulation. If the simulation is running, stop it.
    run = !run;                  
    return run
}



function mergeSort(array, startIdx, endIdx, animations) {
    /*
        *** Main function of the Merge Sort Algorithm ***
            Sort an array using the merge sort algorithm
            Recursive function
        
        param array:        array of all values to sort
        type array:         Array[float]
        param startIdx:     index position from which the array will be sorted
        type startIdx:      Integer
        param endIdx:       index position to which the array will be sorted
        type endIdx:        Integer
        param animations:   array of all animations to play
        type animations:    Array[Animations]
    */
    if (startIdx < endIdx) {
        let midIdx = Math.floor((startIdx + endIdx)/2);

        mergeSort(array, startIdx, midIdx, animations);
        mergeSort(array, midIdx + 1, endIdx, animations);
        merge(array, startIdx, midIdx, endIdx, animations);
    }
}

function merge(array, startIdx, midIdx, endIdx, animations) {
    let i = startIdx;
    let j = midIdx + 1;
    let slow = array.length < 50;
    while (i <= endIdx && j <= endIdx) {
        if (array[j] <= array[i]) {
            let anim;

            if (i == j && slow) {
                anim = new AnimationMerge("merge", 2, i, array[j])
                animations.push(anim)
            }
            else {
                // Update the array
                anim = new AnimationMerge("merge", 1, i, array[j])
                animations.push(anim)
                // See the change
                if (slow) {
                    anim = new AnimationMerge("merge", 3, i, j)
                    animations.push(anim)
                }
            }
            insert(array, i, array[j]);
            i++;
            j++;
        }
        else {
            if (slow) {
                let anim = new AnimationMerge("merge", 0, i, array[j])
                animations.push(anim)
            }
            i++;
        }
    }
}


