import axios from 'axios';
import { CREATE_BOOKING, FETCH_BOOKINGS } from '../types';

// Action to create a booking
export const createBooking = (bookingData) => async (dispatch) => {
    try {
        const response = await axios.post('/api/bookings', bookingData);
        dispatch({
            type: CREATE_BOOKING,
            payload: response.data,
        });
    } catch (error) {
        console.error('Error creating booking:', error);
    }
};

// Action to fetch bookings for a user
export const fetchBookings = (userId) => async (dispatch) => {
    try {
        const response = await axios.get(`/api/bookings/${userId}`);
        dispatch({
            type: FETCH_BOOKINGS,
            payload: response.data,
        });
    } catch (error) {
        console.error('Error fetching bookings:', error);
    }
};