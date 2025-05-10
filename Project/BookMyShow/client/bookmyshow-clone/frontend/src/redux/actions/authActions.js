import axios from 'axios';
import { LOGIN_SUCCESS, LOGIN_FAIL, SIGNUP_SUCCESS, SIGNUP_FAIL, LOGOUT } from '../types';

// Set the base URL for the API
const API_URL = 'http://localhost:5000/api/auth';

// Action to handle user login
export const login = (email, password) => async (dispatch) => {
    try {
        const response = await axios.post(`${API_URL}/login`, { email, password });
        dispatch({
            type: LOGIN_SUCCESS,
            payload: response.data,
        });
        // Optionally, you can set the token in local storage or cookies here
    } catch (error) {
        dispatch({
            type: LOGIN_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Action to handle user signup
export const signup = (username, email, password) => async (dispatch) => {
    try {
        const response = await axios.post(`${API_URL}/signup`, { username, email, password });
        dispatch({
            type: SIGNUP_SUCCESS,
            payload: response.data,
        });
    } catch (error) {
        dispatch({
            type: SIGNUP_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Action to handle user logout
export const logout = () => (dispatch) => {
    dispatch({ type: LOGOUT });
    // Optionally, you can remove the token from local storage or cookies here
};