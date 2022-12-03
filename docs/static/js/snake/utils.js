/*
 * File: utils.js
 * Creation: Sunday July 5th 2020
 * Author: Arthur Dujardin
 * Contact: arthur.dujardin@ensg.eu
 *          arthurd@ifi.uio.no
 * --------
 * Copyright (c) 2020 Arthur Dujardin
 */


var SEED = 0;


function random() {
    var x = (1 + Math.sin(SEED++)) / 2;
    return x;
}

function randint(min, max) {
    var x = min + Math.floor(random() * (max - min))
    return x;
}


function deg2rad(angle) {
  return angle / 180 * Math.PI;
}


function sign(number) {
  if (number > 0) {
    return 1;
  }
  else if (number < 0) {
    return -1;
  }
  return 0;
}


function one_hot_vector(y, num_class) {
  y_tilde = nj.zeros(num_class);
  y_tilde[y] = 1;
  return y_tilde;
}

function one_hot_direction(direction) {
  var y_tilde = nj.zeros(4);
  y_tilde.set(Math.floor(Direction[direction] / 90), 1);
  return y_tilde;
}

function argmax(X) {
  var amax = [0, 0];
  var max = X.get(0, 0);
  for (let i = 0; i < X.shape[0]; i++) {
    for (let j = 0; j < X.shape[1]; j++) {
      if (X.get(i, j) > max) {
        max = X.get(i, j);
        amax = [i, j];
      }
    }
  }
  if (X.shape[1] == 1) {
    amax = amax[0];
  }
  return amax;
}



function maxArray(X) {
  var max = X.get(0, 0);
  for (let i = 0; i < X.shape[0]; i++) {
    for (let j = 0; j < X.shape[1]; j++) {
      if (X.get(i, j) > max) {
        max = X.get(i, j);
      }
    }
  }
  return max;
}




function invertArray(X) {
  Xinv = nj.zeros(X.shape)
  for (let i = 0; i < X.size; i++) {
    if (X.get(i) != 0) {
      Xinv.set(i, 1 / X.get(i));
    }
  }
  return Xinv;
}