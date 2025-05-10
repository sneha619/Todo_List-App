import { CREATE_BOOKING, FETCH_BOOKINGS } from '../actions/bookingActions';

const initialState = {
    bookings: [],
};

const bookingReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_BOOKING:
            return {
                ...state,
                bookings: [...state.bookings, action.payload],
            };
        case FETCH_BOOKINGS:
            return {
                ...state,
                bookings: action.payload,
            };
        default:
            return state;
    }
};

export default bookingReducer;