/**
 * 4. Scope Middleware
 * Enforces organization_id / property_id tenancy boundaries.
 */
export function scope(req, res, next) {
  req.scope = {
    propertyId: req.headers['x-property-id'] || req.params?.propertyId || null,
    organizationId: req.headers['x-organization-id'] || req.params?.organizationId || null,
  };
  next();
}

export function requirePropertyScope(req, res, next) {
  if (!req.scope?.propertyId) {
    return res.status(400).json({
      type: 'https://dormio.in/errors/missing-scope',
      title: 'Bad Request',
      status: 400,
      detail: 'Property ID scope is required for this operation.',
      instance: req.originalUrl,
    });
  }
  next();
}
