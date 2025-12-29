import { getDb } from '../../db/index.js';
import { registrations } from '../../db/schema.js';
import { eq } from 'drizzle-orm';

export async function handler(event) {
  // Only allow DELETE requests
  if (event.httpMethod !== 'DELETE') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    const { email } = JSON.parse(event.body);

    // Validate email
    if (!email) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Email is required' }),
      };
    }

    // Get database connection
    const db = getDb(process.env.DATABASE_URL);

    // Find and delete registration by email
    const deleted = await db
      .delete(registrations)
      .where(eq(registrations.email, email.toLowerCase()))
      .returning();

    if (deleted.length === 0) {
      return {
        statusCode: 404,
        body: JSON.stringify({
          success: false,
          error: 'Aucune inscription trouvée avec cet email'
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
        message: `Désinscription confirmée pour ${deleted[0].name}`,
        registration: deleted[0],
      }),
    };
  } catch (error) {
    console.error('Error deleting registration:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal server error' }),
    };
  }
}
