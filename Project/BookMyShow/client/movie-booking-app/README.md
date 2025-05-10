# Movie Booking Application

This is a dynamic web application that allows users to choose a movie, view available theaters, select seats based on the seating arrangement, and proceed to payment using Stripe.

## Features

- Browse and select movies
- View available theaters for selected movies
- Interactive seat selection
- Secure payment processing with Stripe

## Project Structure

```
movie-booking-app
├── public
│   ├── css
│   │   └── styles.css
│   ├── js
│   │   └── scripts.js
│   └── index.html
├── src
│   ├── controllers
│   │   ├── movieController.js
│   │   ├── theaterController.js
│   │   └── paymentController.js
│   ├── models
│   │   ├── movieModel.js
│   │   ├── theaterModel.js
│   │   └── bookingModel.js
│   ├── routes
│   │   ├── movieRoutes.js
│   │   ├── theaterRoutes.js
│   │   └── paymentRoutes.js
│   ├── services
│   │   ├── seatSelectionService.js
│   │   └── stripeService.js
│   └── app.js
├── package.json
├── .env
├── README.md
└── tsconfig.json
```

## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```
   cd movie-booking-app
   ```
3. Install the dependencies:
   ```
   npm install
   ```
4. Create a `.env` file in the root directory and add your environment variables.

## Usage

1. Start the server:
   ```
   npm start
   ```
2. Open your browser and go to `http://localhost:3000` to access the application.

## Contributing

Feel free to submit issues or pull requests for any improvements or bug fixes.

## License

This project is licensed under the MIT License.