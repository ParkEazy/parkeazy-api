const fast2sms = require('fast-two-sms');

const generateOTP = (otp_length) => {
  const digits = '0123456789';
  let OTP = '';
  for (let i = 0; i < otp_length; i++) {
    OTP += digits[Math.floor(Math.random() * 10)];
  }
  return OTP;
};

const sendOTP = async ({ message, phone }, next) => {
  try {
    const res = await fast2sms.sendMessage({
      authorization: process.env.FAST2SMS,
      message,
      numbers: [phone],
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { generateOTP, sendOTP };
