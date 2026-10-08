import { PermissionRules, Actions } from '@dormio/shared';

/**
 * 5. Policies Middleware
 * CASL-style authorization rules enforcement.
 */
export function checkPolicy(action, subject) {
  return (req, res, next) => {
    const role = req.user?.role;
    if (!role) {
      return res.status(403).json({
        type: 'https://dormio.in/errors/forbidden',
        title: 'Forbidden',
        status: 403,
        detail: 'Permission denied: No active role identified.',
        instance: req.originalUrl,
      });
    }

    const rules = PermissionRules[role] || [];
    const hasPermission = rules.some(
      (r) =>
        (r.action === Actions.MANAGE || r.action === action) &&
        (r.subject === 'all' || r.subject === subject)
    );

    if (!hasPermission) {
      return res.status(403).json({
        type: 'https://dormio.in/errors/forbidden',
        title: 'Forbidden',
        status: 403,
        detail: `Role ${role} is not authorized to ${action} ${subject}.`,
        instance: req.originalUrl,
      });
    }

    next();
  };
}
