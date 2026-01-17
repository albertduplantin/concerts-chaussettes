import { getDb } from '../../db/index.js';
import { registrations } from '../../db/schema.js';

// Simple token generation based on email and id
function generateToken(email, id) {
  const data = `${email}-${id}-concert-chaussettes-secret`;
  let hash = 0;
  for (let i = 0; i < data.length; i++) {
    const char = data.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash).toString(36);
}

export async function handler(event) {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    const data = JSON.parse(event.body);

    // Validate required fields
    if (!data.name || !data.email || !data.phone) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Name, email, and phone are required' }),
      };
    }

    // Get database connection
    const db = getDb(process.env.DATABASE_URL);

    // Insert registration
    const result = await db.insert(registrations).values({
      name: data.name,
      email: data.email,
      phone: data.phone,
      guests: parseInt(data.guests) || 1,
      message: data.message || null,
    }).returning();

    const registration = result[0];
    const token = generateToken(registration.email, registration.id);

    return {
      statusCode: 201,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        success: true,
        registration: registration,
        token: token,
        modifyUrl: `/modify-registration.html?email=${encodeURIComponent(registration.email)}&token=${token}`,
      }),
    };
  } catch (error) {
    console.error('Error creating registration:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal server error' }),
    };
  }
}
