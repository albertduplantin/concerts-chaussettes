import { getDb } from '../../db/index.js';
import { contacts } from '../../db/schema.js';

export async function handler(event) {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    const { firstName, lastName, email, phone, source } = JSON.parse(event.body);

    if (!firstName || !lastName || !email) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Prénom, nom et email sont requis' }),
      };
    }

    const db = getDb(process.env.DATABASE_URL);

    const result = await db.insert(contacts).values({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.toLowerCase().trim(),
      phone: phone?.trim() || null,
      source: source || 'manual',
    }).returning();

    return {
      statusCode: 201,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        success: true,
        contact: result[0],
      }),
    };
  } catch (error) {
    console.error('Error creating contact:', error);

    // Handle duplicate email error
    if (error.message?.includes('unique') || error.code === '23505') {
      return {
        statusCode: 409,
        body: JSON.stringify({ error: 'Cet email existe déjà dans la liste' }),
      };
    }

    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal server error' }),
    };
  }
}
