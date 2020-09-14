/*
 * File: neuralnetwork.js
 * Creation: Sunday July 5th 2020
 * Author: Arthur Dujardin
 * Contact: arthur.dujardin@ensg.eu
 *          arthurd@ifi.uio.no
 * --------
 * Copyright (c) 2020 Arthur Dujardin
 */


// Useful functions
function linear(X) {
    return X;
}

function relu(X) {
    Z = nj.zeros(X.shape);
    for (let i = 0; i < X.shape[0]; i++) {
        for (let j = 0; j < X.shape[1]; j++) {
            if (X.get(i, j) > 0) {
                Z.set(i, j, X.get(i, j));
            }
        }
    }
    return Z;
}

function softmax(X) {
    var exp = nj.exp(X);
    var sum = exp.sum(0);
    var Z =  exp.divide(sum);
    return Z;
}


// NeuralNetwork
class NeuralNetwork {

    constructor(layer_dimensions) {
        this.layer_dimensions = layer_dimensions;
        this.params = this._init_params();
    }

    _init_params() {
        /*
        Initialize the parameters of the network.

        Parameters
        ----------
        layer_dimensions : list(int)
            A list of length L+1 with the number of nodes in each layer, 
            including the input layer, all hidden layers, and the output layer.

        Returns
        -------
        dict
            A dictionary with initialized parameters for all parameters 
            (weights and biases) in the network.
        */

        // Creating the parameters dict
        var params = {};
        // Depth of the neural network
        var depth = this.layer_dimensions.length;
        // Create the weights and biases
        for (let i = 1;  i < depth; i++) {
            // Weights
            var W_shape = [this.layer_dimensions[i - 1], this.layer_dimensions[i]];
            var W = nj.random(W_shape).multiply(2).add(-1);     // Uniform [-1, 1]
            var b = nj.zeros([this.layer_dimensions[i], 1]);
            // Saving in the param dict
            var layer_W = "W_" + i.toString();
            params[layer_W] = W;
            var layer_b = "b_" + i.toString();
            params[layer_b] = b;
        }
        return params
    }


    forward(X_batch) {
        /*
        One forward step.
    
        Args:
            X_batch: float numpy array with shape [n^[0], batch_size].
            params: python dict with weight and bias parameters for each layer.
    
        Returns:
            Y_proposed: float numpy array with shape [n^[L], batch_size]. The output predictions of the
                        network, where n^[L] is the number of prediction classes. For each input i in
                        the batch, Y_proposed[c, i] gives the probability that input i belongs to class
                        c.
        */

       // Get the layers dimension
       var depth = this.layer_dimensions.length - 1;
       // 1/ Iterates through the depth of the neural network
       var Z = X_batch;
       this.params['A_0'] = Z;
        for (let i = 1; i < depth + 1; i++) {
            // 1.1/ Get the weights and biases from the params       
            var layer_W = "W_" + i.toString();
            var layer_b = "b_" + i.toString();
            var W = this.params[layer_W];
            var b = this.params[layer_b];              
            // 1.2/ Compute the outputs
            var Z = nj.dot(W.T, Z);
            Z.add(b, false);
            // 2/ Activation
            // The activation only occurs in the hidden layers,
            // not from the last hidden layer to the outputs
            if (i < depth) {
                Z = relu(Z);
                this.params['A_' + i.toString()] = Z;
            }
        }
        // 3/ Softmax
        var Y_proposed = softmax(Z);
        this.params['A_' + depth.toString()] = Y_proposed;
        return Y_proposed;
    }

}   // End NeuralNetwork

