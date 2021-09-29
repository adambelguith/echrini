const mongoose = require('mongoose');

const CartSchema = mongoose.Schema({
    nameproduit: {
            type: String,
            unique: [false, 'The login is unique']
           
    },
    price: {
        type: String,
        unique: [false, 'The email is unique']   
},
category: {
    type: String,
    unique: [false, 'The email is unique']   
},
quantity: {
    type: String,
    unique: [false, 'The email is unique']   
},
    image: {
            type: String,
            unique: [false, 'The email is unique']   
    },
    idb:{
            type: String,
            unique: [false, 'The email is unique']
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Cart', CartSchema);