/*
 * File: enum.js
 * Creation: Sunday July 5th 2020
 * Author: Arthur Dujardin
 * Contact: arthur.dujardin@ensg.eu
 *          arthurd@ifi.uio.no
 * --------
 * Copyright (c) 2020 Arthur Dujardin
 */


const Direction = {
    "UP": 0,
    "LEFT": 90,
    "DOWN": 180,
    "RIGHT": 270
}

const Degree2Direction = {
    0:   "UP",
    90:  "LEFT",
    180: "DOWN",
    270: "RIGHT"
}


const Item = {
    "WALL": 0,
    "SNAKE": 1,
    "APPLE": 2,
    "EMPTY": 3
}
