import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovies } from '../redux/actions/movieActions';
import BookingForm from '../components/BookingForm';

const BookingPage = () => {
    const dispatch = useDispatch();
    const movies = useSelector(state => state.movie.movies);
    const loading = useSelector(state => state.movie.loading);
    const error = useSelector(state => state.movie.error);

    useEffect(() => {
        dispatch(fetchMovies());
    }, [dispatch]);

    return (
        <div className="booking-page">
            <h1>Book Your Tickets</h1>
            {loading && <p>Loading movies...</p>}
            {error && <p>{error}</p>}
            {movies && movies.length > 0 ? (
                <BookingForm movies={movies} />
            ) : (
                <p>No movies available for booking.</p>
            )}
        </div>
    );
};

export default BookingPage;