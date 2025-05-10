const Movie = require('../models/Movie');

// Get all movies
exports.getAllMovies = async (req, res) => {
    try {
        const movies = await Movie.find();
        res.status(200).json(movies);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching movies', error });
    }
};

// Get a single movie by ID
exports.getMovieById = async (req, res) => {
    const { id } = req.params;
    try {
        const movie = await Movie.findById(id);
        if (!movie) {
            return res.status(404).json({ message: 'Movie not found' });
        }
        res.status(200).json(movie);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching movie', error });
    }
};

// Add a new movie
exports.addMovie = async (req, res) => {
    const { title, genre, duration, showtimes } = req.body;
    try {
        const newMovie = new Movie({ title, genre, duration, showtimes });
        await newMovie.save();
        res.status(201).json(newMovie);
    } catch (error) {
        res.status(500).json({ message: 'Error adding movie', error });
    }
};

// Update a movie by ID
exports.updateMovie = async (req, res) => {
    const { id } = req.params;
    const { title, genre, duration, showtimes } = req.body;
    try {
        const updatedMovie = await Movie.findByIdAndUpdate(id, { title, genre, duration, showtimes }, { new: true });
        if (!updatedMovie) {
            return res.status(404).json({ message: 'Movie not found' });
        }
        res.status(200).json(updatedMovie);
    } catch (error) {
        res.status(500).json({ message: 'Error updating movie', error });
    }
};

// Delete a movie by ID
exports.deleteMovie = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedMovie = await Movie.findByIdAndDelete(id);
        if (!deletedMovie) {
            return res.status(404).json({ message: 'Movie not found' });
        }
        res.status(200).json({ message: 'Movie deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting movie', error });
    }
};