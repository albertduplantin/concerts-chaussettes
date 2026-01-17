import { getDb } from '../../db/index.js';
import { registrations } from '../../db/schema.js';
import { eq } from 'drizzle-orm';

// Simple token generation based on email and id
function generateToken(email, id) {
  const data = `${email}-${id}-concert-chaussettes-secret`;
  let hash = 0;
  for (let i = 0; i < data.length; i++) {
    const char = data.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash).toString(36);
}

export async function handler(event) {
  // Only allow DELETE requests
  if (event.httpMethod !== 'DELETE') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    const { email, token } = JSON.parse(event.body);

    // Validate email
    if (!email) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Email is required' }),
      };
    }

    // Get database connection
    const db = getDb(process.env.DATABASE_URL);

    // First find the registration to verify token if provided
    const existing = await db
      .select()
      .from(registrations)
      .where(eq(registrations.email, email.toLowerCase()));

    if (existing.length === 0) {
      return {
        statusCode: 404,
        body: JSON.stringify({
          success: false,
          error: 'Aucune inscription trouvée avec cet email'
        }),
      };
    }

    // If token is provided, verify it (for public deletion)
    if (token) {
      const expectedToken = generateToken(email.toLowerCase(), existing[0].id);
      if (token !== expectedToken) {
        return {
          statusCode: 403,
          body: JSON.stringify({ error: 'Token invalide' }),
        };
      }
    }

    // Delete registration
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
