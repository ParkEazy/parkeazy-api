// Import necessary modules
const express = require('express');
const morgan = require('morgan');

// Instantiate express application
const app = express();

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.get('/api/v1/ping', (req, res, next) => {
  const msg = {
    status: 'success',
    message: 'pong',
  };
  res.json(msg);
});

module.exports = app;
