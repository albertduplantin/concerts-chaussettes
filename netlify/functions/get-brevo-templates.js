export async function handler(event) {
  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    const BREVO_API_KEY = process.env.BREVO_API_KEY;

    if (!BREVO_API_KEY) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Configuration email manquante (BREVO_API_KEY)' }),
      };
    }

    const response = await fetch('https://api.brevo.com/v3/smtp/templates?limit=50&offset=0', {
      method: 'GET',
      headers: {
        'api-key': BREVO_API_KEY,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      return {
        statusCode: response.status,
        body: JSON.stringify({ error: errorData.message || 'Erreur API Brevo' }),
      };
    }

    const data = await response.json();

    // Formater les templates pour l'admin
    const templates = (data.templates || []).map(t => ({
      id: t.id,
      name: t.name,
      subject: t.subject,
      htmlContent: t.htmlContent,
      isActive: t.isActive,
      createdAt: t.createdAt,
    }));

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ success: true, templates }),
    };
  } catch (error) {
    console.error('Error fetching templates:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal server error: ' + error.message }),
    };
  }
}
