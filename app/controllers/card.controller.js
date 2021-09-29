const Cart = require('../models/card.model.js');

// Create and Save a new admin
exports.create = (req, res) => {
    // Validate request
    if(!req.body.nameproduit) {
        return res.status(400).send({
            message: "cart content can not be empty"
        });
    }

    // Create a admin
    const cart = new Cart({
        nameproduit: req.body.nameProduit || "Untitled cart", 
        prix : req.body.prix,
        category: req.body.category,
        quantity: req.body.quantity,
        image: req.body.image
      });

    // Save admin in the database
    cart.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the cart."
        });
    });
};

// Retrieve and return all cart from the database.
exports.findAll = (req, res) => {
    Cart.find()
    .then(carts => {
        res.send(carts);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving carts."
        });
    });
};

// Find a single admin with a adminId
exports.findOne = (req, res) => {
    Cart.findById(req.params.cartId)
    .then(cart => {
        if(!cart) {
            return res.status(404).send({
                message: "cart not found with id " + req.params.cartId
            });            
        }
        res.send(cart);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "cart not found with id " + req.params.cartId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving cart with id " + req.params.cartId
        });
    });
};

// Update a admin identified by the adminId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.nameproduit) {
        return res.status(400).send({
            message: "cart content can not be empty"
        });
    }

    // Find admin and update it with the request body
    Cart.findByIdAndUpdate(req.params.cartId, {
        nameproduit: req.body.nameProduit || "Untitled cart", 
        prix : req.body.prix,
        category: req.body.category,
        quantity: req.body.quantity,
        image: req.body.image,
        idb: req.body.idb
    }, {new: true})
    .then(cart => {
        if(!cart) {
            return res.status(404).send({
                message: "cart not found with id " + req.params.cartId
            });
        }
        res.send(cart);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "cart not found with id " + req.params.cartId
            });                
        }
        return res.status(500).send({
            message: "Error updating cart with id " + req.params.cartId
        });
    });
};

// Delete a cart with the specified cartId in the request
exports.delete = (req, res) => {
    Cart.findByIdAndRemove(req.params.cartId)
    .then(cart => {
        if(!cart) {
            return res.status(404).send({
                message: "cart not found with id " + req.params.cartId
            });
        }
        res.send({message: "cart deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "cart not found with id " + req.params.cartId
            });                
        }
        return res.status(500).send({
            message: "Could not delete cart with id " + req.params.cartId
        });
    });
};
