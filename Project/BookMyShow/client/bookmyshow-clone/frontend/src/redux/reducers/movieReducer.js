import { FETCH_MOVIES, ADD_MOVIE, UPDATE_MOVIE, DELETE_MOVIE } from '../actions/movieActions';

const initialState = {
    movies: [],
    loading: true,
    error: null,
};

const movieReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_MOVIES:
            return {
                ...state,
                movies: action.payload,
                loading: false,
            };
        case ADD_MOVIE:
            return {
                ...state,
                movies: [...state.movies, action.payload],
            };
        case UPDATE_MOVIE:
            return {
                ...state,
                movies: state.movies.map(movie =>
                    movie._id === action.payload._id ? action.payload : movie
                ),
            };
        case DELETE_MOVIE:
            return {
                ...state,
                movies: state.movies.filter(movie => movie._id !== action.payload),
            };
        default:
            return state;
    }
};

export default movieReducer;