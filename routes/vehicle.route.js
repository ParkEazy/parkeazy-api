const express = require('express');

const {
  newVehicle,
  getVehicles,
  updateVehicle,
  deleteVehicle,
} = require('../controllers/vehicle.controller');

const { isLoggedIn } = require('../middleware/auth');

const router = express.Router();

router.route('/vehicle').post(isLoggedIn, newVehicle);
router.route('/vehicles').get(isLoggedIn, getVehicles);
router
  .route('/vehicle/:id')
  .put(isLoggedIn, updateVehicle)
  .delete(isLoggedIn, deleteVehicle);

module.exports = router;
