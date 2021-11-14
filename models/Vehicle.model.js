const { Schema, model } = require('mongoose');

const vehicleSchema = new Schema(
  {
    user: {
      type: Schema.ObjectId,
      ref: 'User',
      required: true,
    },
    make: {
      type: String,
      required: true,
      trim: true,
    },
    registration: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
  },
  { timestamps: true }
);

module.exports = model('Vehicle', vehicleSchema, 'Vehicle');
