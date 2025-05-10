import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Navbar = () => {
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <Link to="/">BookMyShow Clone</Link>
            </div>
            <div className="navbar-links">
                <Link to="/">Home</Link>
                {isAuthenticated ? (
                    <>
                        <Link to="/bookings">My Bookings</Link>
                        <Link to="/logout">Logout</Link>
                    </>
                ) : (
                    <>
                        <Link to="/login">Login</Link>
                        <Link to="/signup">Signup</Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;