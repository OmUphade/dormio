import { describe, it, expect } from 'vitest';
import request from 'supertest';
import { createApp } from '../src/app.js';

describe('Dormio API Application Endpoints', () => {
  const app = createApp();

  it('GET /health returns 200 with database status and timestamp', async () => {
    const res = await request(app).get('/health');
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('status');
    expect(res.body.status).toBe('healthy');
    expect(res.body).toHaveProperty('services');
    expect(res.body.services.database).toBe('healthy');
    expect(res.headers).toHaveProperty('x-request-id');
  });

  it('GET /api/docs/openapi.json returns valid OpenAPI 3.0 document', async () => {
    const res = await request(app).get('/api/docs/openapi.json');
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('openapi');
    expect(res.body.openapi).toMatch(/^3\./);
    expect(res.body.info.title).toBe('Dormio Platform API');
  });

  it('GET /api/v1/ping returns 200 pong', async () => {
    const res = await request(app).get('/api/v1/ping');
    expect(res.status).toBe(200);
    expect(res.body.message).toBe('pong');
  });
});
