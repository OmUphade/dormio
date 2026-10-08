import { migrate } from 'drizzle-orm/postgres-js/migrator';
import { db, client } from '../infra/db.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function runMigration() {
  console.log('Running Drizzle migrations...');
  try {
    await migrate(db, {
      migrationsFolder: path.resolve(__dirname, 'migrations'),
    });
    console.log('Migrations applied successfully!');
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  } finally {
    await client.end();
  }
}

runMigration();
