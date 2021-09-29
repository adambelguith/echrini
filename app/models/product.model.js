const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({
    name: {
            type: String,
            unique: [false, 'The name is unique']
           
    },
    quantity: {
            type: String,
            unique: [false, 'The quantité is unique']
           
    },
    price:{
            type: String,
            unique: [false, 'price is unique']
    },
    category:{
             type: String,
             unique: [false, 'The category is unique']
    },
    image:{
            type: String
            
    },
    ids:{
            type: String
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('product', ProductSchema);