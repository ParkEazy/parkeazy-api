const Vehicle = require('../models/Vehicle.model');
const User = require('../models/User.model');

const asyncHandler = require('../middleware/async');

const ErrorResponse = require('../utils/errorResponse.util');

// @desc    New Vehicle
// @route   POST /api/v1/vehicle
// @access  Private - User
const newVehicle = asyncHandler(async (req, res, next) => {
  const userId = res.locals.user._id;

  const user = await User.findById(userId);
  const vehicle = new Vehicle(req.body);

  vehicle.user = userId;
  user.vehicles.push(vehicle);

  await vehicle.save();
  await user.save();

  res.status(201).json({
    sucess: true,
    data: vehicle,
    message: 'New vehicle added',
  });
});

// @desc    List All Vehicles
// @route   GET /api/v1/vehicles
// @access  Private - User
const getVehicles = asyncHandler(async (req, res, next) => {
  const userId = res.locals.user._id;
  const vehicles = await Vehicle.find({ user: userId });

  res.status(200).json({
    success: true,
    data: vehicles,
  });
});

// @desc    Update Vehicle
// @route   PUT /api/v1/vehicle/:id
// @access  Private - User
const updateVehicle = asyncHandler(async (req, res, next) => {
  const vehicleId = req.params.id;
  const userId = res.locals.user._id;

  let vehicle = await Vehicle.findById(vehicleId);

  if (!vehicle) {
    return next(new ErrorResponse('Vehicle does not exist', 404));
  }

  if (vehicle.user.toString() !== userId.toString()) {
    return next(new ErrorResponse('Unauthorized access', 401));
  }

  vehicle = await Vehicle.findOneAndUpdate({ _id: vehicleId }, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: vehicle,
    message: 'Vehicle updated',
  });
});

// @desc    Delete Vehicle
// @route   DELETE /api/v1/vehicle/:id
// @access  Private - User
const deleteVehicle = asyncHandler(async (req, res, next) => {
  const vehicleId = req.params.id;
  const userId = res.locals.user._id;

  const vehicle = await Vehicle.findById(vehicleId);

  if (!vehicle) {
    return next(new ErrorResponse('Vehicle does not exist', 404));
  }

  if (vehicle.user.toString() !== userId.toString()) {
    return next(new ErrorResponse('Unauthorized access', 401));
  }

  await User.findByIdAndUpdate(userId, { $pull: { vehicles: vehicleId } });
  await vehicle.remove();

  res.status(200).json({
    success: true,
    data: {},
    message: 'Vehicle deleted',
  });
});

module.exports = {
  newVehicle,
  getVehicles,
  updateVehicle,
  deleteVehicle,
};
