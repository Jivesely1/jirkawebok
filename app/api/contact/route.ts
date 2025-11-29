export const runtime = "nodejs";

import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { name, email, message, honey } = await req.json();

    if (honey && honey.trim() !== "") {
      return NextResponse.json({ ok: true });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // 1) Email TOBĚ
    await transporter.sendMail({
      from: `"Web Portfolio" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_TO,
      subject: `Nová zpráva od ${name}`,
      html: `
        <h2>Nová zpráva z portfolia</h2>
        <p><strong>Jméno:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Zpráva:</strong><br/>${message}</p>
      `,
    });

    // 2) Kopie EMAIL odesílateli
    await transporter.sendMail({
      from: `"Web Portfolio" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Kopie zprávy – děkujeme za kontakt",
      html: `
        <p>Ahoj ${name},</p>
        <p>Děkujeme za tvoji zprávu! Brzy se ti ozvu.</p>
        <p><strong>Tvoje zpráva:</strong></p>
        <p>${message}</p>
        <br/><p>— Jirka Veselý, portfolio</p>
      `,
    });

    return NextResponse.json({ ok: true });

  } catch (error) {
    console.error("EMAIL ERROR:", error);
    return NextResponse.json(
      { ok: false, error: "Email se nepodařilo odeslat" },
      { status: 500 }
    );
  }
}
