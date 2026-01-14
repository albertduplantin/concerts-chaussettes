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
    const { contactsList } = JSON.parse(event.body);

    if (!Array.isArray(contactsList) || contactsList.length === 0) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Liste de contacts vide ou invalide' }),
      };
    }

    const db = getDb(process.env.DATABASE_URL);

    let imported = 0;
    let skipped = 0;
    const errors = [];

    for (const contact of contactsList) {
      // Validate required fields
      if (!contact.firstName || !contact.lastName || !contact.email) {
        skipped++;
        errors.push(`Ligne ignorée: données manquantes pour ${contact.email || 'email inconnu'}`);
        continue;
      }

      try {
        await db.insert(contacts).values({
          firstName: contact.firstName.trim(),
          lastName: contact.lastName.trim(),
          email: contact.email.toLowerCase().trim(),
          phone: contact.phone?.trim() || null,
          source: 'import',
        });
        imported++;
      } catch (err) {
        // Skip duplicates silently
        if (err.message?.includes('unique') || err.code === '23505') {
          skipped++;
          errors.push(`Email déjà existant: ${contact.email}`);
        } else {
          skipped++;
          errors.push(`Erreur pour ${contact.email}: ${err.message}`);
        }
      }
    }

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        success: true,
        message: `Import terminé: ${imported} ajouté(s), ${skipped} ignoré(s)`,
        imported,
        skipped,
        errors: errors.slice(0, 10), // Limit error messages
      }),
    };
  } catch (error) {
    console.error('Error importing contacts:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal server error' }),
    };
  }
}
