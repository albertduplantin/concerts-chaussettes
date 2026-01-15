import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { participations } from '../../db/schema.js';
import { eq, and } from 'drizzle-orm';

export default async (req, context) => {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    const { contactId, eventId, status, guests } = await req.json();

    if (!contactId || !eventId) {
      return new Response(JSON.stringify({ error: 'contactId et eventId sont requis' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const sql = neon(process.env.DATABASE_URL);
    const db = drizzle(sql);

    // Vérifier si la participation existe déjà
    const existing = await db.select()
      .from(participations)
      .where(and(
        eq(participations.contactId, parseInt(contactId)),
        eq(participations.eventId, parseInt(eventId))
      ));

    if (existing.length > 0) {
      return new Response(JSON.stringify({
        success: false,
        message: 'Ce contact est déjà inscrit à cet événement',
        participation: existing[0]
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const newParticipation = await db.insert(participations).values({
      contactId: parseInt(contactId),
      eventId: parseInt(eventId),
      status: status || 'registered',
      guests: guests || 1
    }).returning();

    return new Response(JSON.stringify({ success: true, participation: newParticipation[0] }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error adding participation:', error);
    return new Response(JSON.stringify({ error: 'Failed to add participation' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

export const config = {
  path: "/api/add-participation"
};
