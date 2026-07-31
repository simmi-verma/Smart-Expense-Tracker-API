/**
 * 404 Handler for undefined routes.
 */
function notFoundHandler(req, res, next) {
  res.status(404).json({
    error: 'Route not found',
    path: req.originalUrl,
  });
}

/**
 * Global centralized error handling middleware.
 */
function errorHandler(err, req, res, next) {
  console.error('Unhandled Error:', err);
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error',
  });
}

module.exports = {
  notFoundHandler,
  errorHandler,
};
