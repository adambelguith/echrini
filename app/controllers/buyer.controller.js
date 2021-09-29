const Buyer = require('../models/buyer.model.js');

// Create and Save a new buyer
exports.create = (req, res) => {
    // Validate request
    if(!req.body.username) {
        return res.status(400).send({
            message: "buyer content can not be empty"
        });
    }

    // Create a buyer
    const buyer = new Buyer({
        username: req.body.username || "Untitled buyer", 
        email : req.body.email,
        password: req.body.password,
        phone: req.body.phone
    });

    // Save buyer in the database
    buyer.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the admin."
        });
    });
};

// Retrieve and return all buyers from the database.
exports.findAll = (req, res) => {
    Buyer.find()
    .then(buyers => {
        res.send(buyers);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving buyers."
        });
    });
};

// Find a single admin with a buyerId
exports.findOne = (req, res) => {
    Buyer.findById(req.params.adminId)
    .then(buyer => {
        if(!buyer) {
            return res.status(404).send({
                message: "buyer not found with id " + req.params.buyerId
            });            
        }
        res.send(buyer);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "buyer not found with id " + req.params.buyerId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving buyer with id " + req.params.buyerId
        });
    });
};

// Update a buyer identified by the buyerId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.username) {
        return res.status(400).send({
            message: "buyer content can not be empty"
        });
    }

    // Find admin and update it with the request body
    Buyer.findByIdAndUpdate(req.params.buyerId, {
        username: req.body.username || "Untitled buyer", 
        email : req.body.email,
        password: req.body.password,
        phone: req.body.phone
    }, {new: true})
    .then(buyer => {
        if(!buyer) {
            return res.status(404).send({
                message: "buyer not found with id " + req.params.buyerId
            });
        }
        res.send(buyer);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "buyer not found with id " + req.params.buyerId
            });                
        }
        return res.status(500).send({
            message: "Error updating buyer with id " + req.params.buyerId
        });
    });
};

// Delete a buyer with the specified buyerId in the request
exports.delete = (req, res) => {
    Buyer.findByIdAndRemove(req.params.adminId)
    .then(buyer => {
        if(!buyer) {
            return res.status(404).send({
                message: "buyer not found with id " + req.params.buyerId
            });
        }
        res.send({message: "buyer deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "buyer not found with id " + req.params.buyerId
            });                
        }
        return res.status(500).send({
            message: "Could not delete admin with id " + req.params.buyerId
        });
    });
};
