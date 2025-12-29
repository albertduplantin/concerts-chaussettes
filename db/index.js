import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema.js';

export function getDb(databaseUrl) {
  const sql = neon(databaseUrl);
  return drizzle(sql, { schema });
}
