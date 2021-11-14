const jwt = require('jsonwebtoken');

const asyncHandler = require('./async');

const User = require('../models/User.model');

const ErrorResponse = require('../utils/errorResponse.util');
const { verifyJwtToken } = require('../utils/token.util');

const isLoggedIn = asyncHandler(async (req, res, next) => {
  const header = req.headers.authorization;

  if (!header) {
    return next(new ErrorResponse('Auth header missing', 400));
  }

  const token = header.split('Bearer ')[1];

  if (!token) {
    return next(new ErrorResponse('Unauthorized access', 401));
  }

  try {
    // Verify Token
    const userId = verifyJwtToken(token, next);
    const user = await User.findById(userId);
    res.locals.user = user;
    next();
  } catch (err) {
    return next(new ErrorResponse('Unauthorized access', 401));
  }
});

module.exports = { isLoggedIn };
