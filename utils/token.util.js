const jwt = require('jsonwebtoken');

const createJwtToken = (payload) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
  return token;
};

const verifyJwtToken = (token, next) => {
  try {
    const { userId } = jwt.verify(token, process.env.JWT_SECRET);
    return userId;
  } catch (err) {
    return next(new ErrorResponse('Unauthorized access', 401));
  }
};

module.exports = { createJwtToken, verifyJwtToken };
