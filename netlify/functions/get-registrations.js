import { getDb } from '../../db/index.js';
import { registrations } from '../../db/schema.js';
import { desc } from 'drizzle-orm';

export async function handler(event) {
  // Only allow GET requests
  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    // Get database connection
    const db = getDb(process.env.DATABASE_URL);

    // Fetch all registrations, ordered by date
    const allRegistrations = await db
      .select()
      .from(registrations)
      .orderBy(desc(registrations.registeredAt));

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        success: true,
        registrations: allRegistrations,
      }),
    };
  } catch (error) {
    console.error('Error fetching registrations:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal server error' }),
    };
  }
}
