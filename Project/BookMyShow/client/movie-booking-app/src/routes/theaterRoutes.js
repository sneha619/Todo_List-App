const express = require('express');
const router = express.Router();
const TheaterController = require('../controllers/theaterController');

const theaterController = new TheaterController();

router.get('/theaters/:movieId', theaterController.getTheatersByMovie);
router.get('/theater/:id', theaterController.getTheaterById);

module.exports = router;