import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { contacts, participations, events } from '../../db/schema.js';
import { eq, desc, sql, count } from 'drizzle-orm';

export default async (req, context) => {
  try {
    const sqlClient = neon(process.env.DATABASE_URL);
    const db = drizzle(sqlClient);

    // Récupérer tous les contacts avec le nombre de participations
    const contactsWithStats = await db
      .select({
        id: contacts.id,
        firstName: contacts.firstName,
        lastName: contacts.lastName,
        email: contacts.email,
        phone: contacts.phone,
        subscribed: contacts.subscribed,
        source: contacts.source,
        createdAt: contacts.createdAt,
        participationCount: sql`COALESCE(COUNT(${participations.id}), 0)`.as('participation_count')
      })
      .from(contacts)
      .leftJoin(participations, eq(contacts.id, participations.contactId))
      .groupBy(contacts.id)
      .orderBy(desc(sql`participation_count`), desc(contacts.createdAt));

    return new Response(JSON.stringify(contactsWithStats), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error fetching contacts with stats:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch contacts' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

export const config = {
  path: "/api/get-contacts-with-stats"
};
