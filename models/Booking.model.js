const { Schema, model } = require('mongoose');

const bookingSchema = new Schema({
  user: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true,
  },
  vehicle: {
    type: Schema.ObjectId,
    ref: 'Vehicle',
    required: true,
  },
  partner: {
    type: Schema.ObjectId,
    ref: 'Partner',
  },
  startTime: {
    type: Date,
  },
  endTime: {
    type: Date,
  },
});

module.exports = model('Booking', bookingSchema, 'Booking');
