import { getDb } from '../../db/index.js';
import { registrations } from '../../db/schema.js';

export async function handler(event) {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    const data = JSON.parse(event.body);

    // Validate required fields
    if (!data.name || !data.email || !data.phone) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Name, email, and phone are required' }),
      };
    }

    // Get database connection
    const db = getDb(process.env.DATABASE_URL);

    // Insert registration
    const result = await db.insert(registrations).values({
      name: data.name,
      email: data.email,
      phone: data.phone,
      guests: parseInt(data.guests) || 1,
      message: data.message || null,
    }).returning();

    return {
      statusCode: 201,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        success: true,
        registration: result[0],
      }),
    };
  } catch (error) {
    console.error('Error creating registration:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal server error' }),
    };
  }
}
