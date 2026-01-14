import { getDb } from '../../db/index.js';
import { contacts } from '../../db/schema.js';
import { eq } from 'drizzle-orm';

export async function handler(event) {
  if (event.httpMethod !== 'DELETE') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    const { id } = JSON.parse(event.body);

    if (!id) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'ID requis' }),
      };
    }

    const db = getDb(process.env.DATABASE_URL);

    const deleted = await db
      .delete(contacts)
      .where(eq(contacts.id, parseInt(id)))
      .returning();

    if (deleted.length === 0) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: 'Contact non trouvé' }),
      };
    }

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        success: true,
        message: `${deleted[0].firstName} ${deleted[0].lastName} supprimé`,
      }),
    };
  } catch (error) {
    console.error('Error deleting contact:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal server error' }),
    };
  }
}
