# BookMyShow Clone - Frontend Documentation

## Overview
This project is a frontend application for a movie ticket booking system, replicating the core functionality of BookMyShow. It allows users to browse movies, book tickets, and manage their bookings.

## Technologies Used
- **React.js**: A JavaScript library for building user interfaces.
- **Redux**: A state management library for managing application state.
- **CSS**: For styling the application and ensuring responsiveness.

## Project Structure
The frontend is structured as follows:

```
frontend
├── public
│   ├── index.html          # Main HTML file
│   └── favicon.ico         # Favicon for the application
├── src
│   ├── components          # Reusable components
│   │   ├── BookingForm.jsx # Component for booking tickets
│   │   ├── MovieCard.jsx   # Component for displaying movie details
│   │   └── Navbar.jsx      # Navigation bar component
│   ├── pages               # Application pages
│   │   ├── BookingPage.jsx # Page for booking tickets
│   │   ├── HomePage.jsx    # Home page displaying available movies
│   │   ├── LoginPage.jsx    # Login page for user authentication
│   │   └── SignupPage.jsx  # Signup page for new users
│   ├── redux               # Redux state management
│   │   ├── actions         # Action creators
│   │   │   ├── authActions.js   # Actions for authentication
│   │   │   ├── bookingActions.js # Actions for bookings
│   │   │   └── movieActions.js   # Actions for movies
│   │   ├── reducers        # Reducers for managing state
│   │   │   ├── authReducer.js    # Reducer for authentication state
│   │   │   ├── bookingReducer.js  # Reducer for booking state
│   │   │   └── movieReducer.js    # Reducer for movie state
│   │   └── store.js       # Redux store configuration
│   ├── App.jsx             # Main application component
│   ├── index.js            # Entry point for the React application
│   └── styles              # CSS styles
│       └── main.css        # Main stylesheet
├── package.json            # NPM configuration file
└── README.md               # Frontend documentation
```

## Getting Started
1. **Clone the repository**:
   ```
   git clone <repository-url>
   cd bookmyshow-clone/frontend
   ```

2. **Install dependencies**:
   ```
   npm install
   ```

3. **Run the application**:
   ```
   npm start
   ```

## Features
- User authentication (login and signup)
- Browse and search for movies
- Book tickets for selected movies
- View and manage bookings

## Contributing
Contributions are welcome! Please feel free to submit a pull request or open an issue for any suggestions or improvements.

## License
This project is licensed under the MIT License.