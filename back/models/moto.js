const mongoose = require('mongoose');

const motoSchema = mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    createdDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);