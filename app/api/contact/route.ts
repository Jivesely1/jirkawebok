import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const { name, email, message, honey } = await req.json();

  // Antispam – pokud bot vyplní honeypot pole, zahodíme to
  if (honey) return Response.json({ ok: true });

  try {
    // E-mail tobě + kopie uživateli
    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'eveselyjirka@gmail.com',
      cc: email,
      subject: `Nová zpráva od ${name}`,
      html: `
        <div style="font-family:sans-serif; color: #111;">
          <h2>Nová zpráva z formuláře</h2>
          <p><strong>Jméno:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Zpráva:</strong><br/>${message}</p>
        </div>
      `,
    });

    // Potvrzení uživateli
    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: email,
      subject: 'Potvrzení přijetí zprávy',
      html: `
        <div style="font-family:sans-serif; color: #111;">
          <p>Dobrý den ${name},</p>
          <p>děkuji za vaši zprávu! Ozvu se vám co nejdříve.</p>
          <p>S pozdravem,<br/>Jirka</p>
        </div>
      `,
    });

    return Response.json({ ok: true });
  } catch (error) {
    console.error("Chyba při odesílání e-mailu:", error);
    return Response.json({ ok: false, error: 'Nepodařilo se odeslat e-mail.' }, { status: 500 });
  }
}
