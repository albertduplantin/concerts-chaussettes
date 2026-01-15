import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { registrations, contacts, events, participations } from '../../db/schema.js';
import { eq, and } from 'drizzle-orm';

export default async (req, context) => {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    const { eventId } = await req.json();

    const sql = neon(process.env.DATABASE_URL);
    const db = drizzle(sql);

    // Récupérer tous les inscrits
    const allRegistrations = await db.select().from(registrations);

    let imported = 0;
    let existing = 0;
    let participationsAdded = 0;
    const results = [];

    for (const reg of allRegistrations) {
      // Séparer le nom en prénom et nom
      const nameParts = reg.name.trim().split(' ');
      const firstName = nameParts[0] || '';
      const lastName = nameParts.slice(1).join(' ') || nameParts[0] || '';

      // Vérifier si le contact existe déjà
      const existingContact = await db.select()
        .from(contacts)
        .where(eq(contacts.email, reg.email.toLowerCase()));

      let contactId;

      if (existingContact.length > 0) {
        // Le contact existe déjà
        existing++;
        contactId = existingContact[0].id;
        results.push({
          email: reg.email,
          status: 'existing',
          contactId
        });
      } else {
        // Créer le nouveau contact
        const newContact = await db.insert(contacts).values({
          firstName,
          lastName,
          email: reg.email.toLowerCase(),
          phone: reg.phone || null,
          subscribed: true,
          source: 'registration'
        }).returning();

        imported++;
        contactId = newContact[0].id;
        results.push({
          email: reg.email,
          status: 'imported',
          contactId
        });
      }

      // Si un eventId est fourni, ajouter la participation
      if (eventId && contactId) {
        // Vérifier si la participation existe déjà
        const existingParticipation = await db.select()
          .from(participations)
          .where(and(
            eq(participations.contactId, contactId),
            eq(participations.eventId, parseInt(eventId))
          ));

        if (existingParticipation.length === 0) {
          await db.insert(participations).values({
            contactId,
            eventId: parseInt(eventId),
            status: 'registered',
            guests: reg.guests || 1
          });
          participationsAdded++;
        }
      }
    }

    return new Response(JSON.stringify({
      success: true,
      summary: {
        total: allRegistrations.length,
        imported,
        existing,
        participationsAdded
      },
      details: results
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error syncing registrations:', error);
    return new Response(JSON.stringify({ error: 'Failed to sync registrations: ' + error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

export const config = {
  path: "/api/sync-registrations-to-contacts"
};
