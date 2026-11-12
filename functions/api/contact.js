export async function onRequestPost(context) {
  const { request, env } = context;

  try {
    const body = await request.json();
    const turnstileToken = body['cf-turnstile-response'] || body.turnstileToken || '';

    // 1. Server-side Cloudflare Turnstile validation
    if (env.TURNSTILE_SECRET_KEY) {
      const formData = new FormData();
      formData.append('secret', env.TURNSTILE_SECRET_KEY);
      formData.append('response', turnstileToken);

      const verifyRes = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
        method: 'POST',
        body: formData,
      });
      const verifyJson = await verifyRes.json();
      if (!verifyJson.success) {
        return new Response(
          JSON.stringify({ 
            success: false, 
            error: 'Sicherheitsprüfung (Cloudflare Turnstile) fehlgeschlagen. Bitte bestätigen Sie das Kontrollkästchen.' 
          }),
          { status: 403, headers: { 'Content-Type': 'application/json' } }
        );
      }
    }

    // 2. Validate essential fields
    const { name, email, project, company } = body;
    if (!name || !email) {
      return new Response(
        JSON.stringify({ success: false, error: 'Bitte füllen Sie alle Pflichtfelder aus.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // 3. Return success response
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Anfrage erfolgreich empfangen und durch Cloudflare Turnstile verifiziert.' 
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ success: false, error: 'Ungültige Anfrage.' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
