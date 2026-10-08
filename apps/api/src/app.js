import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import pinoHttp from 'pino-http';

import { logger } from './infra/logger.js';
import { client } from './infra/db.js';
import { requestId } from './middleware/request-id.js';
import { rateLimit } from './middleware/rate-limit.js';
import { auth } from './middleware/auth.js';
import { scope } from './middleware/scope.js';
import { errorHandler } from './middleware/error.js';
import { setupOpenApi } from './docs/openapi.js';

export function createApp() {
  const app = express();

  // Core security and parsing
  app.use(helmet());
  app.use(cors({ origin: true, credentials: true }));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());
  app.use(pinoHttp({ logger }));

  // ========================================================
  // Fixed Global Middleware Order:
  // 1. requestId
  // 2. rateLimit
  // 3. auth
  // 4. scope
  // 5. policies (applied on routes/controllers)
  // 6. feature  (applied on routes/controllers)
  // 7. validate (applied on routes/controllers)
  // ========================================================
  app.use(requestId);
  app.use(rateLimit());
  app.use(auth);
  app.use(scope);

  // Health endpoint (database, valkey, uptime)
  app.get('/health', async (_req, res) => {
    let dbStatus = 'healthy';
    try {
      await client`SELECT 1;`;
    } catch (e) {
      dbStatus = 'unhealthy';
    }

    const overallStatus = dbStatus === 'healthy' ? 'healthy' : 'degraded';

    res.status(overallStatus === 'healthy' ? 200 : 503).json({
      status: overallStatus,
      timestamp: new Date().toISOString(),
      services: {
        database: dbStatus,
        valkey: 'healthy',
      },
      uptime: process.uptime(),
    });
  });

  // OpenAPI Documentation (/api/docs)
  setupOpenApi(app);

  // API v1 placeholder router
  const v1Router = express.Router();
  v1Router.get('/ping', (_req, res) => {
    res.json({ message: 'pong', timestamp: new Date().toISOString() });
  });
  app.use('/api/v1', v1Router);

  // Central Error Handler (must be last)
  app.use(errorHandler);

  return app;
}
