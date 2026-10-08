/**
 * 7. Validate Middleware
 * Executes Zod validation against req.body, req.query, or req.params.
 */
export function validate({ body, query, params } = {}) {
  return (req, res, next) => {
    try {
      if (body) {
        req.body = body.parse(req.body);
      }
      if (query) {
        req.query = query.parse(req.query);
      }
      if (params) {
        req.params = params.parse(req.params);
      }
      next();
    } catch (error) {
      if (error?.errors) {
        return res.status(400).json({
          type: 'https://dormio.in/errors/validation-error',
          title: 'Validation Error',
          status: 400,
          detail: 'Request validation failed',
          invalidParams: error.errors.map((e) => ({
            field: e.path.join('.'),
            message: e.message,
          })),
          instance: req.originalUrl,
        });
      }
      next(error);
    }
  };
}
