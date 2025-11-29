import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const { name, email, message, honey } = await req.json();

  if (honey) return Response.json({ ok: true });

  try {
    // E-mail tobě + kopie pro odesílatele
    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'u3754158402@gmail.com',
      cc: email,
      subject: `Nová zpráva od ${name}`,
      html: `<p><strong>E-mail:</strong> ${email}</p><p><strong>Zpráva:</strong><br/>${message}</p>`,
    });

    // Potvrzení odesílateli
    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: email,
      subject: 'Potvrzení přijetí zprávy',
      html: `<p>Děkujeme za zprávu, ${name}! Ozvu se ti do 24 hodin.</p>`,
    });

    return Response.json({ ok: true });
  } catch (error) {
    console.error("Resend error:", error);
    return Response.json({ ok: false, error: 'Nepodařilo se odeslat e-mail.' }, { status: 500 });
  }
}
