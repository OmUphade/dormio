import { v4 as uuidv4 } from 'uuid';

/**
 * 1. Request ID Middleware
 * Ensures every incoming HTTP request has a unique correlation ID.
 */
export function requestId(req, res, next) {
  const reqId = req.headers['x-request-id'] || uuidv4();
  req.id = reqId;
  res.setHeader('X-Request-ID', reqId);
  next();
}
