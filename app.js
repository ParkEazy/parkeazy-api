// Import necessary modules
const express = require('express');
const morgan = require('morgan');

const errorHandler = require('./middleware/error');

// Instantiate express application
const app = express();

// Route files
const authRouter = require('./routes/auth.route');
// const bookingRouter = require('./routes/booking.route');
const partnerRouter = require('./routes/partner.route');
const vehicleRouter = require('./routes/vehicle.route');

// Body-Parser
app.use(express.json());

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use('/api/v1/auth', authRouter);
// app.use('/api/v1', bookingRouter);
app.use('/api/v1/parking', partnerRouter);
app.use('/api/v1', vehicleRouter);

app.use(errorHandler);

module.exports = app;
