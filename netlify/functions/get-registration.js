import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
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
  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    const params = event.queryStringParameters || {};
    const { email, token } = params;

    if (!email || !token) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Email et token requis' }),
      };
    }

    const sql = neon(process.env.DATABASE_URL);
    const db = drizzle(sql);

    // Find registration by email
    const results = await db.select().from(registrations).where(eq(registrations.email, email));

    if (results.length === 0) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: 'Réservation non trouvée' }),
      };
    }

    const registration = results[0];

    // Verify token
    const expectedToken = generateToken(email, registration.id);
    if (token !== expectedToken) {
      return {
        statusCode: 403,
        body: JSON.stringify({ error: 'Token invalide' }),
      };
    }

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(registration),
    };
  } catch (error) {
    console.error('Error getting registration:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal server error' }),
    };
  }
}
