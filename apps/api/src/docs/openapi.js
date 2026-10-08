import { OpenAPIRegistry, OpenApiGeneratorV3 } from '@asteasolutions/zod-to-openapi';
import swaggerUi from 'swagger-ui-express';
import { z } from 'zod';
import {
  PublicListingSchema,
  UserDtoSchema,
  OrgDtoSchema,
  PropertyDtoSchema,
} from '@dormio/shared';

const registry = new OpenAPIRegistry();

// Register Health Schema
const HealthResponseSchema = z.object({
  status: z.enum(['healthy', 'degraded', 'unhealthy']),
  timestamp: z.string(),
  services: z.object({
    database: z.string(),
    valkey: z.string(),
  }),
});

registry.registerPath({
  method: 'get',
  path: '/health',
  summary: 'System health check',
  description: 'Returns health status of the API, PostgreSQL database, and Valkey cache.',
  responses: {
    200: {
      description: 'System is healthy',
      content: {
        'application/json': {
          schema: HealthResponseSchema,
        },
      },
    },
  },
});

registry.registerPath({
  method: 'get',
  path: '/api/v1/listings',
  summary: 'Search public listings',
  description: 'Returns public marketplace listings matching search criteria.',
  responses: {
    200: {
      description: 'Listings retrieved successfully',
      content: {
        'application/json': {
          schema: z.array(PublicListingSchema || z.any()),
        },
      },
    },
  },
});

export function setupOpenApi(app) {
  const generator = new OpenApiGeneratorV3(registry.definitions);
  const openApiDoc = generator.generateDocument({
    openapi: '3.0.0',
    info: {
      title: 'Dormio Platform API',
      version: '1.0.0',
      description:
        'REST API for Dormio marketplace, resident stay management, and operator console.',
    },
    servers: [{ url: 'http://localhost:4000' }],
  });

  // Serve OpenAPI json specification
  app.get('/api/docs/openapi.json', (_req, res) => {
    res.json(openApiDoc);
  });

  // Serve Swagger UI documentation
  app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(openApiDoc));
}
