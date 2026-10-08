import { defineConfig } from 'drizzle-kit';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  schema: './src/db/schema/index.js',
  out: './src/db/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url:
      process.env.DATABASE_URL || 'postgresql://dormio:dormio_dev_password@localhost:5433/dormio',
  },
  verbose: true,
  strict: true,
});
