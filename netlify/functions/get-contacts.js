import { getDb } from '../../db/index.js';
import { contacts } from '../../db/schema.js';
import { desc } from 'drizzle-orm';

export async function handler(event) {
  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    const db = getDb(process.env.DATABASE_URL);

    const allContacts = await db
      .select()
      .from(contacts)
      .orderBy(desc(contacts.createdAt));

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        success: true,
        contacts: allContacts,
      }),
    };
  } catch (error) {
    console.error('Error fetching contacts:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal server error' }),
    };
  }
}
