import { logger } from '../infra/logger.js';

/**
 * Central Error Handler Middleware
 * RFC 7807 compliant problem details error responses with Pino logging.
 */
export function errorHandler(err, req, res, _next) {
  const status = err.status || err.statusCode || 500;
  const requestId = req.id || 'unknown';

  logger.error(
    {
      err,
      requestId,
      method: req.method,
      url: req.originalUrl,
      status,
    },
    'API Request Error'
  );

  res.status(status).json({
    type: err.type || 'https://dormio.in/errors/internal-server-error',
    title: err.title || (status === 500 ? 'Internal Server Error' : 'Request Error'),
    status,
    detail: err.message || 'An unexpected error occurred processing your request.',
    instance: req.originalUrl,
    requestId,
  });
}
