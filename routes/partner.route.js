const express = require('express');

const {
  createParkingLot,
  getParkingLots,
} = require('../controllers/partner.controller');

const { isLoggedIn } = require('../middleware/auth');

const router = express.Router();

router.route('/').post(createParkingLot);
router.route('/show').post(getParkingLots);

module.exports = router;
