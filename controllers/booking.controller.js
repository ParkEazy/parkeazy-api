const Booking = require('../models/Booking.model');

const asyncHandler = require('../middleware/async');

const ErrorResponse = require('../utils/errorResponse.util');

// @desc    Get bookings
// @route   GET /api/v1/bookings
// @access  Private - User
const getBookings = asyncHandler(async (req, res, next) => {
  const userId = res.locals.user._id;
  const vehicles = await Vehicle.find({ user: userId }).populate(
    'user vehicle'
  );

  res.status(200).json({
    success: true,
    data: vehicles,
  });
});

// @desc    Book parking
// @route   GET /api/v1/booking
// @access  Private - User
const bookParking = asyncHandler(async (req, res, next) => {
  const userId = res.locals.user._id;
});

// @desc    Get bookings
// @route   GET /api/v1/bookings
// @access  Private - User
const cancelBooking = asyncHandler(async (req, res, next) => {});
