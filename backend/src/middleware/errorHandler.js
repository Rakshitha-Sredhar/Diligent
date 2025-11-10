import env from '../config/env.js';
import ApiError from '../utils/ApiError.js';

export function notFoundHandler(req, res, next) {
  next(new ApiError(404, `Route ${req.originalUrl} not found`));
}

// eslint-disable-next-line no-unused-vars
export function errorHandler(err, req, res, next) {
  const statusCode = err instanceof ApiError ? err.statusCode : 500;
  const message = err.message || 'Internal server error';

  const response = {
    message
  };

  if (env.nodeEnv !== 'production') {
    response.stack = err.stack;
    response.details = err.details;
  }

  res.status(statusCode).json(response);
}

