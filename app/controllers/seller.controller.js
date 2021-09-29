const Seller = require('../models/seller.model.js');

// Create and Save a new seller
exports.create = (req, res) => {
    // Validate request
    if(!req.body.username) {
        return res.status(400).send({
            message: "user content can not be empty"
        });
    }

    // Create a seller
    const seller = new Seller({
        username: req.body.username || "Untitled seller", 
        email : req.body.email,
        password: req.body.password,
        phone: req.body.phone
    });

    // Save seller in the database
    seller.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the seller."
        });
    });
};

// Retrieve and return all seller from the database.
exports.findAll = (req, res) => {
    Seller.find()
    .then(sellers => {
        res.send(sellers);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving sellers."
        });
    });
};

// Find a single admin with a sellerId
exports.findOne = (req, res) => {
    Seller.findById(req.params.sellerId)
    .then(seller => {
        if(!seller) {
            return res.status(404).send({
                message: "admin not found with id " + req.params.sellerId
            });            
        }
        res.send(seller);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "admin not found with id " + req.params.sellerId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving admin with id " + req.params.sellerId
        });
    });
};

// Update a seller identified by the sllerId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.username) {
        return res.status(400).send({
            message: "seller content can not be empty"
        });
    }

    // Find seller and update it with the request body
    Seller.findByIdAndUpdate(req.params.sellerId, {
        username: req.body.username || "Untitled seller", 
        email : req.body.email,
        password: req.body.password,
        phone: req.body.phone
    }, {new: true})
    .then(seller => {
        if(!seller) {
            return res.status(404).send({
                message: "seller not found with id " + req.params.sellerId
            });
        }
        res.send(seller);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "seller not found with id " + req.params.adminId
            });                
        }
        return res.status(500).send({
            message: "Error updating seller with id " + req.params.adminId
        });
    });
};

// Delete a seller with the specified adminId in the request
exports.delete = (req, res) => {
    Seller.findByIdAndRemove(req.params.sellerId)
    .then(seller => {
        if(!seller) {
            return res.status(404).send({
                message: "seller not found with id " + req.params.sellerId
            });
        }
        res.send({message: "seller deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "seller not found with id " + req.params.sellerId
            });                
        }
        return res.status(500).send({
            message: "Could not delete seller with id " + req.params.sellerId
        });
    });
};