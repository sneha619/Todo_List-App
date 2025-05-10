const express = require('express');
const router = express.Router();
const MovieController = require('../controllers/movieController');

const movieController = new MovieController();

router.get('/', movieController.getMovies);
router.get('/:id', movieController.getMovieById);
router.post('/', movieController.createMovie);

module.exports = router;