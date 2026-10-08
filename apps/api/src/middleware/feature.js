/**
 * 6. Feature Middleware
 * Verifies optional feature flags (cctv, mess_link, visitors, outpass, reviews).
 */
export function requireFeature(featureName) {
  return (req, res, next) => {
    // Feature flags can be loaded from req.propertyFeatures or db cache
    const features = req.propertyFeatures || {};
    if (features[featureName] === false) {
      return res.status(403).json({
        type: 'https://dormio.in/errors/feature-disabled',
        title: 'Feature Disabled',
        status: 403,
        detail: `The requested module (${featureName}) is not enabled for this property.`,
        instance: req.originalUrl,
      });
    }
    next();
  };
}
