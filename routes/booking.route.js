const express = require('express');

const {
  getBookings,
  bookParking,
  cancelBooking,
} = require('../controllers/booking.controller');

const { isLoggedIn } = require('../middleware/auth');

const router = express.Router();

router.route('/bookings').get(isLoggedIn, getBookings);
router.route('/booking').post(isLoggedIn, bookParking);
router.route('/booking/:id').delete(isLoggedIn, cancelBooking);

module.exports = router;
