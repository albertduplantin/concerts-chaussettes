export async function handler(event) {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    const { to, subject, htmlContent, fromName, fromEmail } = JSON.parse(event.body);

    if (!to || !Array.isArray(to) || to.length === 0) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Destinataires requis' }),
      };
    }

    if (!subject || !htmlContent) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Sujet et contenu requis' }),
      };
    }

    const RESEND_API_KEY = process.env.RESEND_API_KEY;

    if (!RESEND_API_KEY) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Configuration email manquante (RESEND_API_KEY)' }),
      };
    }

    // Send emails in batches (Resend allows up to 50 recipients per request)
    const batchSize = 50;
    let sent = 0;
    let failed = 0;
    const errors = [];

    for (let i = 0; i < to.length; i += batchSize) {
      const batch = to.slice(i, i + batchSize);

      try {
        const response = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${RESEND_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: `${fromName || 'Concert Privé'} <${fromEmail || 'onboarding@resend.dev'}>`,
            to: batch,
            subject: subject,
            html: htmlContent,
          }),
        });

        if (response.ok) {
          sent += batch.length;
        } else {
          const errorData = await response.json();
          failed += batch.length;
          errors.push(errorData.message || 'Erreur Resend');
        }
      } catch (err) {
        failed += batch.length;
        errors.push(err.message);
      }
    }

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        success: sent > 0,
        message: `Emails envoyés: ${sent}, Échecs: ${failed}`,
        sent,
        failed,
        errors: errors.slice(0, 5),
      }),
    };
  } catch (error) {
    console.error('Error sending email:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal server error' }),
    };
  }
}
