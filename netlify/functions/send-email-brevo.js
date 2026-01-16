export async function handler(event) {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    const { to, subject, htmlContent, fromName, fromEmail, testMode } = JSON.parse(event.body);

    // Mode test - juste vérifier la connexion API
    if (testMode) {
      const BREVO_API_KEY = process.env.BREVO_API_KEY;

      if (!BREVO_API_KEY) {
        return {
          statusCode: 500,
          body: JSON.stringify({ error: 'Configuration email manquante (BREVO_API_KEY)' }),
        };
      }

      // Vérifier le compte Brevo
      const accountResponse = await fetch('https://api.brevo.com/v3/account', {
        method: 'GET',
        headers: {
          'api-key': BREVO_API_KEY,
          'Content-Type': 'application/json',
        },
      });

      if (accountResponse.ok) {
        const accountData = await accountResponse.json();
        return {
          statusCode: 200,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            success: true,
            message: 'Connexion Brevo OK',
            account: {
              email: accountData.email,
              firstName: accountData.firstName,
              lastName: accountData.lastName,
              companyName: accountData.companyName,
              plan: accountData.plan?.[0]?.type || 'free'
            }
          }),
        };
      } else {
        const errorData = await accountResponse.json();
        return {
          statusCode: 400,
          body: JSON.stringify({ error: 'Clé API invalide', details: errorData.message }),
        };
      }
    }

    // Mode envoi normal
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

    const BREVO_API_KEY = process.env.BREVO_API_KEY;

    if (!BREVO_API_KEY) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Configuration email manquante (BREVO_API_KEY)' }),
      };
    }

    // Brevo permet d'envoyer à plusieurs destinataires
    // Mais pour éviter que tous voient les autres emails, on envoie individuellement
    let sent = 0;
    let failed = 0;
    const errors = [];

    // Envoyer par lots de 10 pour ne pas surcharger
    const batchSize = 10;

    for (let i = 0; i < to.length; i += batchSize) {
      const batch = to.slice(i, i + batchSize);

      // Envoyer chaque email individuellement (pour la confidentialité)
      const promises = batch.map(async (email) => {
        try {
          const response = await fetch('https://api.brevo.com/v3/smtp/email', {
            method: 'POST',
            headers: {
              'api-key': BREVO_API_KEY,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              sender: {
                name: fromName || 'Concert Chaussettes',
                email: fromEmail || 'concert@example.com'
              },
              to: [{ email: email }],
              subject: subject,
              htmlContent: htmlContent,
            }),
          });

          if (response.ok) {
            return { success: true, email };
          } else {
            const errorData = await response.json();
            return { success: false, email, error: errorData.message };
          }
        } catch (err) {
          return { success: false, email, error: err.message };
        }
      });

      const results = await Promise.all(promises);

      for (const result of results) {
        if (result.success) {
          sent++;
        } else {
          failed++;
          errors.push(`${result.email}: ${result.error}`);
        }
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
      body: JSON.stringify({ error: 'Internal server error: ' + error.message }),
    };
  }
}
