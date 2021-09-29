const mongoose = require('mongoose');

const BuyerSchema = mongoose.Schema({
    username: {
            type: String,
            unique: [true, 'The login is unique']
           
    },
    email: {
            type: String,
            unique: [true, 'The email is unique']
           
    },
    password: String,
    phone:{
        type: String,
        unique: [true,'The phone is unique']
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Buyer', BuyerSchema);