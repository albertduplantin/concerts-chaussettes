import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { events } from '../../db/schema.js';
import { desc } from 'drizzle-orm';

export default async (req, context) => {
  try {
    const sql = neon(process.env.DATABASE_URL);
    const db = drizzle(sql);

    const allEvents = await db.select().from(events).orderBy(desc(events.date));

    return new Response(JSON.stringify(allEvents), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error fetching events:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch events' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

export const config = {
  path: "/api/get-events"
};
