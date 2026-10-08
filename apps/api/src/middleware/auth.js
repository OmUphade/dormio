/**
 * 3. Auth Middleware
 * Populates req.user from bearer token or session cookie.
 */
export function auth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];
    // In production, verify with jose/JWT. For foundation skeleton:
    req.user = {
      id: req.headers['x-user-id'] || 'user-anonymous',
      role: req.headers['x-user-role'] || 'SEEKER',
      token,
    };
  } else {
    req.user = null;
  }
  next();
}

export function requireAuth(req, res, next) {
  if (!req.user) {
    return res.status(401).json({
      type: 'https://dormio.in/errors/unauthorized',
      title: 'Unauthorized',
      status: 401,
      detail: 'Authentication token is required to access this resource.',
      instance: req.originalUrl,
    });
  }
  next();
}
