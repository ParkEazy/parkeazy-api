const { Schema, model } = require('mongoose');

const partnerSchema = new Schema(
  {
    // name: {
    // type: String,
    // },
    // email: {
    //   type: String,
    // },
    // password: {
    //   type: String,
    // },
    // phone: {
    //   type: String,
    // },
    lotName: {
      type: String,
    },
    // lotDescription: {
    //   type: String,
    // },
    // address: {
    //   type: String,
    // },
    location: {
      type: {
        type: String,
        default: 'Point',
      },
      coordinates: {
        type: [Number],
      },
    },
    //   price: {
    //     type: Integer,
    //   },
    //   totalSlots: {
    //     type: Integer,
    //   },
    //   slotsBooked: {
    //     type: Integer,
    //   },
  },
  { timestamps: true }
);
partnerSchema.index({ location: '2dsphere' });
module.exports = model('Partner', partnerSchema, 'Partner');
