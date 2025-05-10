const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    movieId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Movie'
    },
    theaterId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Theater'
    },
    seats: {
        type: [String],
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    bookingDate: {
        type: Date,
        default: Date.now
    },
    paymentStatus: {
        type: String,
        enum: ['Pending', 'Completed', 'Failed'],
        default: 'Pending'
    }
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;