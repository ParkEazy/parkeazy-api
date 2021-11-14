const Partner = require('../models/Partner.model');

const asyncHandler = require('../middleware/async');

const createParkingLot = asyncHandler(async (req, res, next) => {
  const { lotName, type, coordinates } = req.body;
  const location = await Partner.create({
    lotName: lotName,
    location: {
      type: type,
      coordinates: [coordinates[0], coordinates[1]],
    },
  });
  res.status(200).send(location);
});

const getParkingLots = asyncHandler(async (req, res, next) => {
  const { coordinates } = req.body;
  latitude = coordinates[0];
  longitude = coordinates[1];

  const lots = await Partner.find({
    location: {
      $near: {
        $geometry: {
          type: 'Point',
          coordinates: [longitude, latitude],
        },
        $maxDistance: 5000,
      },
    },
  });
  res.status(200).send({ success: true, data: lots });
});

var locQuery = (coords, distance) => {
  return {
    loc: {
      $near: {
        $geometry: { type: 'Point', coordinates: coords },
        $maxDistance: parseInt(distance),
      },
    },
  };
};

module.exports = { createParkingLot, getParkingLots };
