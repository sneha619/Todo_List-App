# BookMyShow Clone

This project is a web application that replicates the core functionality of a movie ticket booking platform similar to BookMyShow. It allows users to browse movies, book tickets, and manage their bookings.

## Features

- User authentication and authorization using JWT and bcrypt.
- Responsive UI built with React.js and Redux.
- Backend functionality implemented with Node.js and Express.js.
- MongoDB for data storage, with schemas for movies, users, and bookings.

## Project Structure

```
bookmyshow-clone
├── backend
│   ├── src
│   │   ├── app.js               # Entry point for the backend application
│   │   ├── config
│   │   │   └── db.js            # Database connection logic
│   │   ├── controllers
│   │   │   ├── authController.js # User authentication functions
│   │   │   ├── bookingController.js # Booking management functions
│   │   │   └── movieController.js # Movie management functions
│   │   ├── middlewares
│   │   │   ├── authMiddleware.js # JWT verification middleware
│   │   │   └── errorHandler.js   # Error handling middleware
│   │   ├── models
│   │   │   ├── Booking.js        # Mongoose schema for bookings
│   │   │   ├── Movie.js          # Mongoose schema for movies
│   │   │   └── User.js           # Mongoose schema for users
│   │   ├── routes
│   │   │   ├── authRoutes.js     # Authentication routes
│   │   │   ├── bookingRoutes.js   # Booking routes
│   │   │   └── movieRoutes.js     # Movie routes
│   │   └── utils
│   │       └── jwtUtils.js       # JWT utility functions
│   ├── package.json               # Backend dependencies and scripts
│   ├── .env                       # Environment variables
│   └── README.md                  # Backend documentation
├── frontend
│   ├── public
│   │   ├── index.html             # Main HTML file for the frontend
│   │   └── favicon.ico            # Application favicon
│   ├── src
│   │   ├── components
│   │   │   ├── BookingForm.jsx    # Booking form component
│   │   │   ├── MovieCard.jsx      # Movie card component
│   │   │   └── Navbar.jsx         # Navigation bar component
│   │   ├── pages
│   │   │   ├── BookingPage.jsx    # Booking page component
│   │   │   ├── HomePage.jsx       # Home page component
│   │   │   ├── LoginPage.jsx      # Login page component
│   │   │   └── SignupPage.jsx     # Signup page component
│   │   ├── redux
│   │   │   ├── actions
│   │   │   │   ├── authActions.js # Authentication action creators
│   │   │   │   ├── bookingActions.js # Booking action creators
│   │   │   │   └── movieActions.js # Movie action creators
│   │   │   ├── reducers
│   │   │   │   ├── authReducer.js # Authentication reducer
│   │   │   │   ├── bookingReducer.js # Booking reducer
│   │   │   │   └── movieReducer.js # Movie reducer
│   │   │   └── store.js           # Redux store configuration
│   │   ├── App.jsx                # Main React component
│   │   ├── index.js               # Entry point for the React application
│   │   └── styles
│   │       └── main.css           # Main CSS styles
│   ├── package.json               # Frontend dependencies and scripts
│   └── README.md                  # Frontend documentation
├── README.md                      # Overall project documentation
└── .gitignore                     # Git ignore file
```

## Getting Started

### Prerequisites

- Node.js
- MongoDB
- npm or yarn

### Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd bookmyshow-clone
   ```

2. Install backend dependencies:
   ```
   cd backend
   npm install
   ```

3. Install frontend dependencies:
   ```
   cd frontend
   npm install
   ```

### Running the Application

1. Start the backend server:
   ```
   cd backend
   node src/app.js
   ```

2. Start the frontend application:
   ```
   cd frontend
   npm start
   ```

### License

This project is licensed under the MIT License.