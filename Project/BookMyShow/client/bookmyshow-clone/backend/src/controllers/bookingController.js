const Booking = require('../models/Booking');
const Movie = require('../models/Movie');

// Create a new booking
exports.createBooking = async (req, res) => {
    try {
        const { movieId, userId, seats } = req.body;

        const booking = new Booking({
            movie: movieId,
            user: userId,
            seats,
        });

        await booking.save();
        res.status(201).json({ message: 'Booking created successfully', booking });
    } catch (error) {
        res.status(500).json({ message: 'Error creating booking', error });
    }
};

// Get all bookings for a user
exports.getUserBookings = async (req, res) => {
    try {
        const userId = req.user.id; // Assuming user ID is stored in req.user by auth middleware
        const bookings = await Booking.find({ user: userId }).populate('movie');

        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving bookings', error });
    }
};