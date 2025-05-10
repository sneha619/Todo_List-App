const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    releaseDate: {
        type: Date,
        required: true
    },
    rating: {
        type: Number,
        min: 0,
        max: 10
    },
    description: {
        type: String
    },
    imageUrl: {
        type: String
    }
});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;