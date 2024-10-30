const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    contact: {
        type: String,
        required: true
    },
    height: {
        type: Number,
        required: true
    },
    weight: {
        type: Number,
        required: true
    },
    bloodSugar: {
        type: Number,
        required: true
    },
    temperature: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);
