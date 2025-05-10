const mongoose = require('mongoose');

const theaterSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    screens: [{
        screenNumber: {
            type: Number,
            required: true
        },
        seatingArrangement: {
            type: [[Boolean]], // 2D array to represent seat availability
            required: true
        }
    }]
});

const Theater = mongoose.model('Theater', theaterSchema);

module.exports = Theater;