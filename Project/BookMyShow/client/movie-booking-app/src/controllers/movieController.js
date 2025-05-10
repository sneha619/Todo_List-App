class MovieController {
    constructor(movieModel) {
        this.movieModel = movieModel;
    }

    async getMovies(req, res) {
        try {
            const movies = await this.movieModel.find({});
            res.status(200).json(movies);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching movies', error });
        }
    }

    async getMovieById(req, res) {
        const { id } = req.params;
        try {
            const movie = await this.movieModel.findById(id);
            if (!movie) {
                return res.status(404).json({ message: 'Movie not found' });
            }
            res.status(200).json(movie);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching movie', error });
        }
    }

    async createMovie(req, res) {
        const newMovie = new this.movieModel(req.body);
        try {
            const savedMovie = await newMovie.save();
            res.status(201).json(savedMovie);
        } catch (error) {
            res.status(400).json({ message: 'Error creating movie', error });
        }
    }
}

export default MovieController;