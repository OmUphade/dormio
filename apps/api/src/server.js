import { createApp } from './app.js';
import { env } from './config/env.js';
import { logger } from './infra/logger.js';
import { client } from './infra/db.js';

const app = createApp();

const server = app.listen(env.PORT, () => {
  logger.info(`Dormio API server started on port ${env.PORT} in ${env.NODE_ENV} mode`);
  logger.info(`Health check available at http://localhost:${env.PORT}/health`);
  logger.info(`OpenAPI docs available at http://localhost:${env.PORT}/api/docs`);
});

// Graceful shutdown handling
function gracefulShutdown(signal) {
  logger.info(`Received ${signal}. Shutting down gracefully...`);
  server.close(async () => {
    logger.info('HTTP server closed.');
    try {
      await client.end();
      logger.info('Database client connection closed.');
    } catch (err) {
      logger.error('Error closing database client:', err);
    }
    process.exit(0);
  });

  setTimeout(() => {
    logger.error('Could not close connections in time, forcefully shutting down');
    process.exit(1);
  }, 10000);
}

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));
