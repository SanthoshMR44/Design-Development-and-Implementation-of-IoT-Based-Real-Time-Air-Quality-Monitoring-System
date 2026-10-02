const logger = require('../utils/logger');
const config  = require('../config');

// 404 handler
const notFound = (req, res, next) => {
  const err = new Error(`Route not found: ${req.originalUrl}`);
  err.status = 404;
  next(err);
};

// Global error handler
const errorHandler = (err, req, res, next) => {
  const status = err.status || 500;
  logger.error(`[${status}] ${err.message} — ${req.method} ${req.originalUrl}`);

  res.status(status).json({
    success: false,
    message: err.message || 'Internal server error.',
    ...(config.env === 'development' && { stack: err.stack }),
  });
};

module.exports = { notFound, errorHandler };
