class TheaterController {
    async getTheatersByMovie(req, res) {
        const movieId = req.params.movieId;
        // Logic to fetch theaters by movie ID
        // Example: const theaters = await TheaterModel.find({ movieId });
        res.json(theaters);
    }

    async getTheaterById(req, res) {
        const theaterId = req.params.theaterId;
        // Logic to fetch theater by ID
        // Example: const theater = await TheaterModel.findById(theaterId);
        res.json(theater);
    }
}

export default new TheaterController();