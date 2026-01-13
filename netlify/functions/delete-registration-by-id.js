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
    const { id } = JSON.parse(event.body);

    // Validate ID
    if (!id) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'ID is required' }),
      };
    }

    // Get database connection
    const db = getDb(process.env.DATABASE_URL);

    // Delete registration by ID
    const deleted = await db
      .delete(registrations)
      .where(eq(registrations.id, parseInt(id)))
      .returning();

    if (deleted.length === 0) {
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
        message: `${deleted[0].name} a été supprimé avec succès`,
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
