/*
 * File: charts.js
 * Creation: Sunday July 5th 2020
 * Author: Arthur Dujardin
 * Contact: arthur.dujardin@ensg.eu
 *          arthurd@ifi.uio.no
 * --------
 * Copyright (c) 2020 Arthur Dujardin
 */


/*
 * Defines a plot for colorply, showing wavelength influence on the Sequoia sensors.
 * A button is used to switch from one graph to another.
 */


var ctx = document.getElementById('wavelength');

var wavelength = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Mix', 'Rocks', 'Forest', 'Urban'],
        datasets: [{
            label: 'GREEN',
            data: [3048, 4618, 1398, 2072],
            backgroundColor: [
                'rgba(75, 192, 192, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(75, 192, 192, 0.2)',
            ],
            borderColor: [
                'rgba(75, 192, 192, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(75, 192, 192, 1)',
            ],
            borderWidth: 1
        },
        {
            label: 'RED',
            data: [3357, 5471, 777, 1377],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 99, 132, 0.2)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(255, 99, 132, 1)',
            ],
            borderWidth: 1
        },
        {
            label: 'REG',
            data: [3830, 5545, 1782, 3252],
            backgroundColor: [
                'rgba(153, 102, 255, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(153, 102, 255, 0.2)',
            ],
            borderColor: [
                'rgba(153, 102, 255, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(153, 102, 255, 1)',
            ],
            borderWidth: 1
        },
        {
            label: 'NIR',
            data: [3584, 5509, 1854, 1658],
            backgroundColor: [
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 159, 64, 1)',
                'rgba(255, 159, 64, 1)',
                'rgba(255, 159, 64, 1)',
                'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                },
                scaleLabel: {
                    display: true,
                    labelString: 'Nb Feature Points'
                }
            }],
            xAxes: [{
                scaleLabel: {
                    display: true,
                    labelString: 'Scenes'
                }
            }]
        },
        plugins: {
            deferred: {
              yOffset: '35%', // defer until 25% of the canvas height are inside the viewport
              delay: 500      // delay of 500 ms after the canvas is considered inside the viewport
            }
        },
        title: {
            display: true,
            text: 'Number of feature points generated with MicMac'
        }   
    }
});


/* 
 * Changing the graph when click on buttons
 */

// Features
$("#btn1").on("click", function() {
    wavelength.data.datasets[0].data = [3048, 4618, 1398, 2072];
    wavelength.data.datasets[1].data = [3357, 5471, 777, 1377];
    wavelength.data.datasets[2].data = [3830, 5545, 1782, 3252];
    wavelength.data.datasets[3].data = [3584, 5509, 1854, 1658];
    wavelength.options.scales.yAxes[0].scaleLabel.labelString = 'Nb Feature Points';
    wavelength.options.title.text = 'Number of feature points generated with MicMac';
    wavelength.update();
});

// False Points
$("#btn2").on("click", function() {
    wavelength.data.datasets[0].data = [1.3246, 0.9728, 2.0547, 0.8734];
    wavelength.data.datasets[1].data = [0.9601, 0.4573, 6.0962, 1.3757];
    wavelength.data.datasets[2].data = [0.4961, 0.2736, 1.4782, 0.56];
    wavelength.data.datasets[3].data = [0.6398, 0.2342, 1.4777, 1.1611];
    wavelength.options.scales.yAxes[0].scaleLabel.labelString = "Rate of false points (%)"
    wavelength.options.title.text = 'Rate of feature points incorrectly matched with MicMac';
    wavelength.update();
});

// Errors
$("#btn3").on("click", function() {
    wavelength.data.datasets[0].data = [0.6989, 0.5685, 0.9046, 0.4344];
    wavelength.data.datasets[1].data = [0.6774, 0.5454, 0.8489, 0.5092];
    wavelength.data.datasets[2].data = [0.587, 0.5182, 0.9176, 0.3671];
    wavelength.data.datasets[3].data = [0.6871, 0.5508, 0.9219, 0.4711];
    wavelength.options.scales.yAxes[0].scaleLabel.labelString = "Errors (px)"
    wavelength.options.title.text = 'Mean residual errors';
    wavelength.update();
});