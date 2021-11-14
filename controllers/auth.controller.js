// const Vehicle = require('../models/User.model');
const User = require('../models/User.model');
const asyncHandler = require('../middleware/async');

const ErrorResponse = require('../utils/errorResponse.util');
const { generateOTP, sendOTP } = require('../utils/otp.util');
const { createJwtToken } = require('../utils/token.util');

// @desc    Register User
// @route   POST /api/v1/auth/register
// @access  Public
const registerUser = asyncHandler(async (req, res, next) => {
  // await User.collection.drop();
  // await Vehicle.collection.drop();
  const { phone } = req.body;
  const phoneExist = await User.findOne({ phone: phone });
  if (phoneExist) {
    return next(new ErrorResponse('Phone Number already exists', 400));
  }

  const user = await User.create({ phone: phone });

  const otp = generateOTP(6);
  user.phoneOtp = otp;
  await user.save();

  await sendOTP(
    {
      message: `Your OTP is ${otp}`,
      phone: user.phone,
    },
    next
  );

  res.status(200).json({
    success: true,
    userId: user._id,
    message: 'OTP sent to your registered phone number',
  });
  // res.send('hello');
});

// @desc    Login User
// @route   POST /api/v1/auth/login
// @access  Public
const loginUser = asyncHandler(async (req, res, next) => {
  const { phone } = req.body;
  const user = await User.findOne({ phone });

  if (!user) {
    return next(new ErrorResponse('User not found', 400));
  }

  const otp = generateOTP(6);
  user.phoneOtp = otp;
  user.isAccountVerified = true;
  await user.save();

  await sendOTP(
    {
      message: `Your OTP is ${otp}`,
      phone: user.phone,
    },
    next
  );

  res.status(200).json({
    success: true,
    userId: user._id,
    message: 'OTP sent to your registered phone number',
  });
});

// @desc    Verify OTP
// @route   POST /api/v1/auth/verify
// @access  Public
const verifyOtp = asyncHandler(async (req, res, next) => {
  const { userId, otp } = req.body;
  const user = await User.findById(userId);

  if (!user) {
    return next(new ErrorResponse('User not found', 400));
  }

  if (user.phoneOtp !== otp) {
    return next(new ErrorResponse('Incorrect OTP entered', 400));
  }

  const token = createJwtToken({ userId: user._id });

  user.phoneOtp = '';
  await user.save();

  res.status(200).json({
    success: true,
    data: {
      token,
      userId: user._id,
    },
    message: 'User logged in successfully',
  });
});

// @desc    Get current logged in user
// @route   GET /api/v1/auth/me
// @access  Private - User
const fetchCurrentUser = asyncHandler(async (req, res, next) => {
  const userId = res.locals.user._id;

  const user = await User.findById(userId).populate({ path: 'vehicles' });

  res.status(200).json({
    success: true,
    user: user,
    message: 'Fetch current user',
  });
});

// @desc    Create existing user profile
// @route   GET /api/v1/auth/profule
// @access  Private - User
const createProfile = asyncHandler(async (req, res, next) => {
  const { name, email } = req.body;

  const userId = res.locals.user._id;
  const user = await User.findByIdAndUpdate(
    userId,
    { name: name, email: email },
    { new: true }
  );

  res.status(200).json({
    success: true,
    user: user,
    message: 'User profile created',
  });
});

module.exports = {
  registerUser,
  loginUser,
  verifyOtp,
  fetchCurrentUser,
  createProfile,
};
