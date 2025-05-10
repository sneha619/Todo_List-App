import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createBooking } from '../redux/actions/bookingActions';

const BookingForm = ({ movieId }) => {
    const [numTickets, setNumTickets] = useState(1);
    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.user);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (user) {
            dispatch(createBooking({ movieId, numTickets, userId: user._id }));
        } else {
            alert('Please log in to book tickets.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Book Tickets</h2>
            <div>
                <label htmlFor="numTickets">Number of Tickets:</label>
                <input
                    type="number"
                    id="numTickets"
                    value={numTickets}
                    onChange={(e) => setNumTickets(e.target.value)}
                    min="1"
                    required
                />
            </div>
            <button type="submit">Book Now</button>
        </form>
    );
};

export default BookingForm;