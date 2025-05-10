import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import authReducer from './reducers/authReducer';
import bookingReducer from './reducers/bookingReducer';
import movieReducer from './reducers/movieReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  booking: bookingReducer,
  movie: movieReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;