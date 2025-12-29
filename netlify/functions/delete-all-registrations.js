import { getDb } from '../../db/index.js';
import { registrations } from '../../db/schema.js';
import { sql } from 'drizzle-orm';

export async function handler(event) {
  // Only allow DELETE requests
  if (event.httpMethod !== 'DELETE') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    // Get database connection
    const db = getDb(process.env.DATABASE_URL);

    // Delete all registrations
    await db.delete(registrations);

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        success: true,
        message: 'All registrations deleted',
      }),
    };
  } catch (error) {
    console.error('Error deleting registrations:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal server error' }),
    };
  }
}
