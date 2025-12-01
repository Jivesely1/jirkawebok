export const runtime = "nodejs";

import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { name, email, subject, message, honey } = await req.json();

    // HONEYPOT (bot protection)
    if (honey && honey.trim() !== "") {
      return NextResponse.json({ ok: true });
    }

    // VALIDACE
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { ok: false, error: "Missing required fields." },
        { status: 400 }
      );
    }

    // NASTAVENÍ EMAIL TRANSPORTU
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    /* ---------------------------------------------------------
       1) EMAIL TOBĚ — LUXUSNÍ HTML ŠABLONA
    --------------------------------------------------------- */
    await transporter.sendMail({
      from: `"Web Portfolio" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_TO,
      subject: `📨 Nová zpráva: ${subject} — ${name}`,
      html: `
      <div style="font-family: Arial, sans-serif; max-width: 550px; margin: auto; background: #ffffff; padding: 24px; border-radius: 14px; border: 1px solid #eee;">
        <h2 style="color:#111; margin-bottom: 10px;">📩 Nová zpráva z portfolia</h2>

        <p style="font-size: 15px;"><strong>Jméno:</strong> ${name}</p>
        <p style="font-size: 15px;"><strong>Email:</strong> ${email}</p>
        <p style="font-size: 15px;"><strong>Předmět:</strong> ${subject}</p>

        <hr style="margin: 20px 0; border: none; border-top: 1px solid #ddd;" />

        <p style="font-size: 15px; white-space: pre-line;">
          ${message}
        </p>

        <br />
        <p style="font-size: 13px; color:#666;">Odesláno přes portfolio — Jiří Veselý</p>
      </div>
      `,
    });

    /* ---------------------------------------------------------
       2) KOPIE EMAILU UŽIVATELI — PROFESIONÁLNÍ TEMPLATE
    --------------------------------------------------------- */
    await transporter.sendMail({
      from: `"Web Portfolio" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: `📨 Kopie zprávy: ${subject}`,
      html: `
      <div style="font-family: Arial, sans-serif; max-width: 550px; margin: auto; background: #ffffff; padding: 24px; border-radius: 14px; border: 1px solid #eee;">
        
        <h2 style="color:#111;">Díky za zprávu, ${name}! 🙌</h2>

        <p style="font-size: 15px;">Právě jsem obdržel tvoji zprávu a brzy se ti ozvu.</p>

        <p style="margin-top: 12px; font-size: 15px;">
          <strong>Předmět:</strong> ${subject}
        </p>

        <div style="margin-top: 16px; padding: 12px 18px; background:#f7f7f7; border-radius: 10px;">
          <p style="font-size: 15px; margin: 0; white-space: pre-line;">
            ${message}
          </p>
        </div>

        <br/>
        <p style="font-size: 13px; color:#666;">
          — S pozdravem,<br/>
          <strong>Jiří Veselý</strong><br/>
          Web Developer • Next.js • React
        </p>
      </div>
      `,
    });

    return NextResponse.json({ ok: true });

  } catch (error) {
    console.error("EMAIL ERROR:", error);
    return NextResponse.json(
      { ok: false, error: "Email se nepodařilo odeslat." },
      { status: 500 }
    );
  }
}
