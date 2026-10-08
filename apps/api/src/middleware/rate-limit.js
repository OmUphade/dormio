/**
 * 2. Rate Limit Middleware
 * Standard sliding window rate limiter hook.
 */
export function rateLimit(options = {}) {
  const windowMs = options.windowMs || 60 * 1000;
  const max = options.max || 120;
  const hits = new Map();

  return (req, res, next) => {
    const key = req.ip || 'anonymous';
    const now = Date.now();
    const timestamps = (hits.get(key) || []).filter((t) => now - t < windowMs);

    if (timestamps.length >= max) {
      return res.status(429).json({
        type: 'https://dormio.in/errors/too-many-requests',
        title: 'Too Many Requests',
        status: 429,
        detail: 'Rate limit exceeded. Please try again later.',
        instance: req.originalUrl,
      });
    }

    timestamps.push(now);
    hits.set(key, timestamps);
    next();
  };
}
