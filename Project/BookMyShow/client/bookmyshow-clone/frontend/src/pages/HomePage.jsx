import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovies } from '../redux/actions/movieActions';
import MovieCard from '../components/MovieCard';
import './HomePage.css';

const HomePage = () => {
    const dispatch = useDispatch();
    const movies = useSelector(state => state.movie.movies);
    const loading = useSelector(state => state.movie.loading);
    const error = useSelector(state => state.movie.error);

    useEffect(() => {
        dispatch(fetchMovies());
    }, [dispatch]);

    return (
        <div className="home-page">
            <h1>Available Movies</h1>
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            <div className="movie-list">
                {movies && movies.map(movie => (
                    <MovieCard key={movie._id} movie={movie} />
                ))}
            </div>
        </div>
    );
};

export default HomePage;