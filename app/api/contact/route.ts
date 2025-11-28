import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY); // nebo přímo: new Resend('re_xxxx')

export async function POST(req: Request) {
  const { name, email, message, honey } = await req.json();

  // Anti-spam: honeypot check
  if (honey) {
    return Response.json({ ok: true });
  }

  try {
    const data = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'u3754158402@gmail.com',
      subject: `Nová zpráva od ${name}`,
      html: `<p><strong>E-mail:</strong> ${email}</p><p><strong>Zpráva:</strong><br/>${message}</p>`,
    });

    return Response.json({ ok: true });
  } catch (error) {
    console.error("Email sending failed", error);
    return Response.json({ ok: false, error: "Nepodařilo se odeslat e-mail." }, { status: 500 });
  }
}
