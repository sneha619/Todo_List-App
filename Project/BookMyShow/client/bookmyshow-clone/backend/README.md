# BookMyShow Clone - Backend

This is the backend for the BookMyShow clone application, which allows users to book movie tickets online. The backend is built using Node.js, Express.js, and MongoDB.

## Features

- User authentication and authorization using JWT and bcrypt.
- Movie management including adding, updating, and retrieving movie details.
- Booking management for users to create and retrieve their bookings.
- Middleware for error handling and authentication verification.

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT (JSON Web Tokens)
- bcrypt
- cookie-parser

## Getting Started

### Prerequisites

- Node.js
- MongoDB

### Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   ```

2. Navigate to the backend directory:
   ```
   cd bookmyshow-clone/backend
   ```

3. Install the dependencies:
   ```
   npm install
   ```

4. Create a `.env` file in the backend directory and add the following environment variables:
   ```
   MONGODB_URI=<your_mongodb_connection_string>
   JWT_SECRET=<your_jwt_secret>
   ```

### Running the Application

To start the backend server, run:
```
npm start
```

The server will run on `http://localhost:5000` by default.

## API Endpoints

- **Authentication**
  - `POST /api/auth/signup` - User registration
  - `POST /api/auth/login` - User login

- **Movies**
  - `GET /api/movies` - Retrieve all movies
  - `POST /api/movies` - Add a new movie
  - `PUT /api/movies/:id` - Update movie details
  - `GET /api/movies/:id` - Retrieve a specific movie

- **Bookings**
  - `POST /api/bookings` - Create a new booking
  - `GET /api/bookings` - Retrieve all bookings for the authenticated user

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License.