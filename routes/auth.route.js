const express = require('express');

const {
  registerUser,
  loginUser,
  verifyOtp,
  fetchCurrentUser,
  createProfile,
} = require('../controllers/auth.controller');

const { isLoggedIn } = require('../middleware/auth');

const router = express.Router();

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/verify').post(verifyOtp);
router.route('/me').get(isLoggedIn, fetchCurrentUser);
router.route('/profile').put(isLoggedIn, createProfile);

module.exports = router;
