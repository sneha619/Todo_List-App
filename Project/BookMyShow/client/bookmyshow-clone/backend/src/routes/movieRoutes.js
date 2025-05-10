const express = require('express');
const { addMovie, getMovies } = require('../controllers/movieController');

const router = express.Router();

// Route to add a new movie
router.post('/', addMovie);

// Route to get all movies
router.get('/', getMovies);

module.exports = router;