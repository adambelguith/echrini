const mongoose = require('mongoose');

const SellerSchema = mongoose.Schema({
    username: {
            type: String,
            unique: [true, 'The login is unique']
           
    },
    email: {
            type: String,
            unique: [true, 'The email is unique']
           
    },
    password: String,
    phone: {
        type: String,
        unique:[false,'the phone is unique']
    },
    adresse: {
        type: String,
        unique:[false,'the adresse is unique']
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Seller', SellerSchema);