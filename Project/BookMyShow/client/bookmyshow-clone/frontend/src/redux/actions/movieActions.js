import axios from 'axios';
import { FETCH_MOVIES, FETCH_MOVIE_DETAILS } from '../types/movieTypes';

export const fetchMovies = () => async (dispatch) => {
    try {
        const response = await axios.get('/api/movies');
        dispatch({
            type: FETCH_MOVIES,
            payload: response.data,
        });
    } catch (error) {
        console.error('Error fetching movies:', error);
    }
};

export const fetchMovieDetails = (movieId) => async (dispatch) => {
    try {
        const response = await axios.get(`/api/movies/${movieId}`);
        dispatch({
            type: FETCH_MOVIE_DETAILS,
            payload: response.data,
        });
    } catch (error) {
        console.error('Error fetching movie details:', error);
    }
};