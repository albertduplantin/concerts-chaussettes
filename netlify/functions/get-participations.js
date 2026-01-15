import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { participations, contacts, events } from '../../db/schema.js';
import { eq, desc } from 'drizzle-orm';

export default async (req, context) => {
  try {
    const url = new URL(req.url);
    const contactId = url.searchParams.get('contactId');
    const eventId = url.searchParams.get('eventId');

    const sql = neon(process.env.DATABASE_URL);
    const db = drizzle(sql);

    let query;

    if (contactId) {
      // Récupérer les participations d'un contact avec les détails des événements
      const result = await db
        .select({
          participation: participations,
          event: events
        })
        .from(participations)
        .innerJoin(events, eq(participations.eventId, events.id))
        .where(eq(participations.contactId, parseInt(contactId)))
        .orderBy(desc(events.date));

      return new Response(JSON.stringify(result), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    } else if (eventId) {
      // Récupérer les participants d'un événement avec les détails des contacts
      const result = await db
        .select({
          participation: participations,
          contact: contacts
        })
        .from(participations)
        .innerJoin(contacts, eq(participations.contactId, contacts.id))
        .where(eq(participations.eventId, parseInt(eventId)))
        .orderBy(desc(participations.registeredAt));

      return new Response(JSON.stringify(result), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    } else {
      // Récupérer toutes les participations
      const allParticipations = await db.select().from(participations).orderBy(desc(participations.registeredAt));
      return new Response(JSON.stringify(allParticipations), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }
  } catch (error) {
    console.error('Error fetching participations:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch participations' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

export const config = {
  path: "/api/get-participations"
};
