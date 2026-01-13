import { getDb } from '../../db/index.js';
import { registrations } from '../../db/schema.js';
import { eq } from 'drizzle-orm';

export async function handler(event) {
  // Only allow PUT requests
  if (event.httpMethod !== 'PUT') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    const { id, name, email, phone, guests, message } = JSON.parse(event.body);

    // Validate required fields
    if (!id || !name || !email || !phone || !guests) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing required fields' }),
      };
    }

    // Get database connection
    const db = getDb(process.env.DATABASE_URL);

    // Update registration
    const updated = await db
      .update(registrations)
      .set({
        name,
        email: email.toLowerCase(),
        phone,
        guests: parseInt(guests),
        message: message || null,
      })
      .where(eq(registrations.id, parseInt(id)))
      .returning();

    if (updated.length === 0) {
      return {
        statusCode: 404,
        body: JSON.stringify({
          success: false,
          error: 'Inscription non trouvée'
        }),
      };
    }

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        success: true,
        message: 'Inscription mise à jour avec succès',
        registration: updated[0],
      }),
    };
  } catch (error) {
    console.error('Error updating registration:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal server error' }),
    };
  }
}
