import React from 'react';
import { Link } from 'react-router-dom';

const MovieCard = ({ movie }) => {
    return (
        <div className="movie-card">
            <img src={movie.poster} alt={movie.title} className="movie-poster" />
            <h3 className="movie-title">{movie.title}</h3>
            <p className="movie-genre">{movie.genre}</p>
            <p className="movie-duration">{movie.duration} mins</p>
            <Link to={`/movies/${movie._id}`} className="book-button">Book Now</Link>
        </div>
    );
};

export default MovieCard;