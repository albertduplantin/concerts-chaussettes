import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { events } from '../../db/schema.js';

export default async (req, context) => {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    const { name, date, description, venue, isActive } = await req.json();

    if (!name) {
      return new Response(JSON.stringify({ error: 'Le nom de l\'événement est requis' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const sql = neon(process.env.DATABASE_URL);
    const db = drizzle(sql);

    const newEvent = await db.insert(events).values({
      name,
      date: date ? new Date(date) : null,
      description: description || null,
      venue: venue || null,
      isActive: isActive !== undefined ? isActive : true
    }).returning();

    return new Response(JSON.stringify({ success: true, event: newEvent[0] }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error creating event:', error);
    return new Response(JSON.stringify({ error: 'Failed to create event' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

export const config = {
  path: "/api/create-event"
};
